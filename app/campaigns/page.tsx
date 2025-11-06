'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle } from 'lucide-react';

type Recurring = 'one_time' | 'monthly';

const categories = [
    'General Fund',
    'Clean Water',
    'Education',
    'Emergency Relief',
    'Hearts 4 Haiti'
] as const;

const presets = [25, 50, 100, 250] as const;

export default function DonatePage() {
    const [formData, setFormData] = useState({
        amount: '' as string,              // string for input, we'll parse to number
        customAmount: '' as string,
        recurring: 'one_time' as Recurring,
        coverFees: true,
        designation: 'General Fund' as (typeof categories)[number],
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const activeBase = useMemo(() => {
        const baseStr = formData.customAmount || formData.amount;
        const base = parseFloat(baseStr || '0');
        return Number.isFinite(base) ? base : 0;
    }, [formData.amount, formData.customAmount]);

    const totalWithFees = useMemo(() => {
        const factor = formData.coverFees ? 1.03 : 1;
        const total = Math.round(activeBase * factor * 100) / 100;
        return total;
    }, [activeBase, formData.coverFees]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const selectPreset = (val: number) => {
        setFormData(prev => ({
            ...prev,
            amount: String(val),
            customAmount: ''
        }));
    };

    const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = e.target.value.replace(/[^0-9.]/g, '');
        setFormData(prev => ({
            ...prev,
            customAmount: sanitized,
            amount: '' // clear preset when typing custom
        }));
    };

    const dollarsToCents = (v: number) => Math.round(v * 100);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        // Simple validations
        if (!formData.name.trim()) {
            setErrorMessage('Please enter your name.');
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrorMessage('Please enter a valid email.');
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }
        if (activeBase < 1) {
            setErrorMessage('Minimum donation is $1.00.');
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }

        try {
            // If using Supabase Edge Function instead:
            // const res = await fetch('/functions/v1/create-checkout', { ... })
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message || null,
                    designation: formData.designation,
                    recurring: formData.recurring,                   // 'one_time' | 'monthly'
                    coverFees: formData.coverFees,
                    base_amount_cents: dollarsToCents(activeBase),
                    amount_cents: dollarsToCents(totalWithFees)
                })
            });

            if (!res.ok) {
                const data = (await res.json().catch(() => ({}))) as { error?: string };
                setErrorMessage(data?.error || 'Unable to start checkout. Please try again.');
                setSubmitStatus('error');
                setIsSubmitting(false);
                return;
            }

            const data = (await res.json()) as { url?: string };
            if (data?.url) {
                window.location.href = data.url;
                return;
            }

            setErrorMessage('No checkout URL returned.');
            setSubmitStatus('error');
        } catch {
            setErrorMessage('Something went wrong. Please try again.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        // (Not used here because we redirect to checkout, but left for parity with your style)
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Thanks for your gift!</h2>
                    <p className="text-gray-600 mb-6">
                        You’ll receive a receipt by email shortly.
                    </p>
                    <Link
                        href="/"
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Support This Campaign</h1>
                    <p className="text-lg text-gray-600">
                        Your donation powers clean water, education, and safer communities.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                    {submitStatus === 'error' && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-red-900 mb-1">Checkout Failed</h3>
                                <p className="text-red-700 text-sm">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    {/* Amount */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Donation Amount</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {presets.map(v => {
                                const active = String(v) === formData.amount && !formData.customAmount;
                                return (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => selectPreset(v)}
                                        className={[
                                            'rounded-lg border px-3 py-2 text-sm font-medium transition',
                                            active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
                                        ].join(' ')}
                                        aria-pressed={active}
                                    >
                                        ${v}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">$</span>
                                <input
                                    name="customAmount"
                                    inputMode="decimal"
                                    value={formData.customAmount}
                                    onChange={handleCustomAmount}
                                    placeholder="Enter any amount"
                                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Minimum $1.00</p>
                        </div>
                        <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                name="coverFees"
                                checked={formData.coverFees}
                                onChange={handleChange}
                                className="h-4 w-4"
                            />
                            <span>Add ~3% to cover processing fees (Total: ${totalWithFees.toFixed(2)})</span>
                        </label>
                    </div>

                    {/* Frequency & Designation */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-sm font-medium text-gray-700 mb-2">Frequency</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {(['one_time', 'monthly'] as Recurring[]).map(opt => {
                                    const active = formData.recurring === opt;
                                    return (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, recurring: opt }))}
                                            className={[
                                                'rounded-lg border px-3 py-2 text-sm font-medium transition',
                                                active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
                                            ].join(' ')}
                                            aria-pressed={active}
                                        >
                                            {opt === 'one_time' ? 'One-time' : 'Monthly'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-gray-700 mb-2">Designation</h2>
                            <select
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Donor Info */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Jane Doe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="jane@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Add a note to the team"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href="/"
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing…' : 'Donate Now'}
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        You’ll receive an email receipt instantly.
                    </p>
                </form>
            </div>
        </div>
    );
}
