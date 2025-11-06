'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import Link from "next/link";

// Mock data - will be replaced by Supabase data
const mockStories = [
    {
        id: '1',
        title: 'Bringing Clean Water to Rural Communities',
        kid_name: 'Emma Rodriguez',
        age: 14,
        nonprofit_name: 'Wells for Tomorrow',
        location: 'Austin, TX',
        story_text: 'At 12 years old, I visited my grandmother\'s village in Guatemala and saw families walking miles for clean water. That experience changed everything...',
        cover_image_url: 'https://images.unsplash.com/photo-1541544537156-7627a0c99047?w=800&h=600&fit=crop',
        cause_category: 'Water & Sanitation',
        created_at: '2024-09-15'
    },
    {
        id: '2',
        title: 'Coding Classes for Underserved Youth',
        kid_name: 'Marcus Chen',
        age: 16,
        nonprofit_name: 'Code the Future',
        location: 'San Francisco, CA',
        story_text: 'Growing up in a low-income neighborhood, I never had access to coding education until a mentor changed my life. Now I\'m paying it forward...',
        cover_image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
        cause_category: 'Education',
        created_at: '2024-10-02'
    },
    {
        id: '3',
        title: 'Fighting Food Insecurity One Meal at a Time',
        kid_name: 'Sophia Johnson',
        age: 13,
        nonprofit_name: 'Lunch Box Heroes',
        location: 'Chicago, IL',
        story_text: 'When I learned that kids in my own school were going hungry, I knew I had to do something. Starting with my own lunch money...',
        cover_image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
        cause_category: 'Hunger Relief',
        created_at: '2024-08-20'
    },
    {
        id: '4',
        title: 'Protecting Endangered Sea Turtles',
        kid_name: 'Kai Nakamura',
        age: 15,
        nonprofit_name: 'Turtle Guardians',
        location: 'Honolulu, HI',
        story_text: 'The first time I saw a sea turtle tangled in plastic, I cried. Then I got angry. Then I got to work organizing beach cleanups...',
        cover_image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        cause_category: 'Environment',
        created_at: '2024-07-10'
    },
    {
        id: '5',
        title: 'Mental Health Support for Teens',
        kid_name: 'Aisha Patel',
        age: 17,
        nonprofit_name: 'Mind Matters Youth',
        location: 'Boston, MA',
        story_text: 'After losing a close friend to depression, I realized how many teens struggle in silence. I created a peer support network...',
        cover_image_url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop',
        cause_category: 'Mental Health',
        created_at: '2024-11-01'
    },
    {
        id: '6',
        title: 'Books for Every Child',
        kid_name: 'Jamal Washington',
        age: 12,
        nonprofit_name: 'Reading Rainbow Revival',
        location: 'Atlanta, GA',
        story_text: 'Books gave me hope when times were tough. Now I\'m building little free libraries in neighborhoods that need them most...',
        cover_image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
        cause_category: 'Literacy',
        created_at: '2024-06-05'
    }
];

const categories = [
    'All Stories',
    'Education',
    'Environment',
    'Health',
    'Hunger Relief',
    'Water & Sanitation',
    'Mental Health',
    'Literacy',
    'Animal Welfare'
];

export default function StoriesGallery() {
    const [stories, setStories] = useState(mockStories);
    const [filteredStories, setFilteredStories] = useState(mockStories);
    const [selectedCategory, setSelectedCategory] = useState('All Stories');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('status', 'approved')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching stories:', error);
                    // Keep using mock data if there's an error
                } else if (data && data.length > 0) {
                    setStories(data);
                    setFilteredStories(data);
                }
            } catch (error) {
                console.error('Error:', error);
                // Keep using mock data if there's an error
            } finally {
                setLoading(false);
            }
        }

        fetchStories();
    }, []);

    useEffect(() => {
        let filtered = stories;

        // Filter by category
        if (selectedCategory !== 'All Stories') {
            filtered = filtered.filter(story => story.cause_category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(story =>
                story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.kid_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.nonprofit_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.story_text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredStories(filtered);
    }, [selectedCategory, searchQuery, stories]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Young Humanitarians</h1>
                    <p className="text-xl opacity-90 mb-8">
                        Inspiring stories from kids making a real difference in their communities
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search stories by name, cause, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">Loading stories...</p>
                    </div>
                ) : filteredStories.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">No stories found. Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredStories.map((story) => (
                            <article
                                key={story.id}
                                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                            >
                                {/* Cover Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={story.cover_image_url}
                                        alt={story.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-blue-600">
                                        {story.cause_category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {story.title}
                                    </h2>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {story.kid_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{story.kid_name}, {story.age}</p>
                                            <p className="text-sm text-gray-600">{story.nonprofit_name}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-4 line-clamp-3">
                                        {story.story_text}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      📍 {story.location}
                    </span>
                                        <span>{formatDate(story.created_at)}</span>
                                    </div>

                                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                        Read Full Story
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-4 mt-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Have a Story to Share?</h2>
                    <p className="text-xl opacity-90 mb-8">
                        Are you a young changemaker making a difference? We would love to feature your story!
                    </p>
                    <Link
                        href="/stories/submit"
                        className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                    >
                        Submit Your Story
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50 py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-blue-600 mb-2">{stories.length}+</div>
                            <div className="text-gray-700 font-medium">Young Humanitarians</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-purple-600 mb-2">50K+</div>
                            <div className="text-gray-700 font-medium">Lives Impacted</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-green-600 mb-2">$2M+</div>
                            <div className="text-gray-700 font-medium">Raised for Causes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}