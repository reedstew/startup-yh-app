'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    'Education',
    'Environment',
    'Health',
    'Hunger Relief',
    'Water & Sanitation',
    'Mental Health',
    'Literacy',
    'Animal Welfare',
    'Arts & Culture',
    'Technology',
    'Other'
];

const relationships = [
    { value: 'kid', label: 'I am the kid entrepreneur' },
    { value: 'parent', label: 'I am a parent/guardian' },
    { value: 'mentor', label: 'I am a mentor/teacher' },
    { value: 'other', label: 'Other' }
];

export default function SubmitStory() {
    const [formData, setFormData] = useState({
        title: '',
        kid_name: '',
        age: '',
        nonprofit_name: '',
        location: '',
        story_text: '',
        cause_category: '',
        video_url: '',
        submitter_name: '',
        submitter_email: '',
        submitter_relationship: ''
    });

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image must be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            setCoverImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setCoverImage(null);
        setCoverImagePreview('');
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabase.storage
            .from('story-images')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('story-images')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const supabase = createClient();

            let coverImageUrl = null;
            if (coverImage) {
                coverImageUrl = await uploadImage(coverImage);
                if (!coverImageUrl) {
                    throw new Error('Failed to upload image');
                }
            }

            const { error } = await supabase
                .from('stories')
                .insert([
                    {
                        title: formData.title,
                        kid_name: formData.kid_name,
                        age: formData.age ? parseInt(formData.age) : null,
                        nonprofit_name: formData.nonprofit_name,
                        location: formData.location,
                        story_text: formData.story_text,
                        cause_category: formData.cause_category,
                        cover_image_url: coverImageUrl,
                        video_url: formData.video_url || null,
                        submitter_name: formData.submitter_name,
                        submitter_email: formData.submitter_email,
                        submitter_relationship: formData.submitter_relationship,
                        status: 'pending'
                    }
                ])
                .select();

            if (error) throw error;

            setSubmitStatus('success');

            setFormData({
                title: '',
                kid_name: '',
                age: '',
                nonprofit_name: '',
                location: '',
                story_text: '',
                cause_category: '',
                video_url: '',
                submitter_name: '',
                submitter_email: '',
                submitter_relationship: ''
            });
            setCoverImage(null);
            setCoverImagePreview('');

        } catch (error) {
            console.error('Error submitting story:', error);
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Story Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for sharing this inspiring story! We will review it and get back to you soon.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Submit Another Story
                        </button>
                        <Link
                            href="/stories"
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                            View Stories
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <Link href="/stories" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back to Stories
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Story</h1>
                    <p className="text-lg text-gray-600">
                        Tell us about your nonprofit journey and inspire other young changemakers!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                    {submitStatus === 'error' && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-red-900 mb-1">Submission Failed</h3>
                                <p className="text-red-700 text-sm">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Story Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="For example: Bringing Clean Water to Rural Communities"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kid&apos;s Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="kid_name"
                                        value={formData.kid_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="First and last name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        min="5"
                                        max="18"
                                        placeholder="Age"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nonprofit Name *
                                </label>
                                <input
                                    type="text"
                                    name="nonprofit_name"
                                    value={formData.nonprofit_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name of your nonprofit or initiative"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, State"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cause Category *
                                    </label>
                                    <select
                                        name="cause_category"
                                        value={formData.cause_category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Story *
                                </label>
                                <textarea
                                    name="story_text"
                                    value={formData.story_text}
                                    onChange={handleChange}
                                    required
                                    rows={8}
                                    placeholder="Tell us about your journey. What inspired you? What challenges did you face? What impact have you made?"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.story_text.length} characters
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Media</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cover Image
                                </label>
                                {coverImagePreview ? (
                                    <div className="relative w-full h-64">
                                        <Image
                                            src={coverImagePreview}
                                            alt="Cover preview"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Video URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="video_url"
                                    value={formData.video_url}
                                    onChange={handleChange}
                                    placeholder="YouTube or Vimeo link"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="submitter_name"
                                    value={formData.submitter_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your full name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    name="submitter_email"
                                    value={formData.submitter_email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Relationship to the Story *
                                </label>
                                <select
                                    name="submitter_relationship"
                                    value={formData.submitter_relationship}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select your relationship</option>
                                    {relationships.map(rel => (
                                        <option key={rel.value} value={rel.value}>{rel.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href="/stories"
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Story for Review'}
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        By submitting, you agree that your story may be published on our platform after review.
                    </p>
                </form>
            </div>
        </div>
    );
}