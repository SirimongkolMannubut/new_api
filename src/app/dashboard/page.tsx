'use client'

import React from 'react'
import Image from 'next/image'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="relative group mb-16 text-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-16 border border-white/10">
            <h1 className="text-7xl font-black bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-8">
              Dashboard
            </h1>
            <p className="text-2xl text-white/90 font-semibold">
              🎯 API Management Center 🚀
            </p>
          </div>
        </div>

        {/* API Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Auth Management */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🔐</div>
              <h3 className="text-3xl font-bold text-white mb-4">Authentication</h3>
              <p className="text-white/70 mb-6">Login & Register System</p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• JWT Token Auth</div>
                <div>• Secure Password Hash</div>
                <div>• User Sessions</div>
              </div>
            </div>
          </div>

          {/* Users Management */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-3xl font-bold text-white mb-4">Users</h3>
              <p className="text-white/70 mb-6">User Account Management</p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Create Users</div>
                <div>• View All Users</div>
                <div>• Profile Management</div>
              </div>
            </div>
          </div>

          {/* Orders Management */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">👕</div>
              <h3 className="text-3xl font-bold text-white mb-4">Shirt Orders</h3>
              <p className="text-white/70 mb-6">เสื้อเฉลิมฉลองเมือง 243 ปี</p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Order Management</div>
                <div>• Order Statistics</div>
                <div>• Customer Info</div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Overview */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-12 border border-white/10">
            <h3 className="text-4xl font-bold text-white mb-8 text-center">📊 System Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">🔐</div>
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <div className="text-white/70">Active Users</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">👕</div>
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <div className="text-white/70">Total Orders</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">💰</div>
                <div className="text-3xl font-bold text-white mb-2">฿0</div>
                <div className="text-white/70">Revenue</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">📈</div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/70">API Uptime</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}