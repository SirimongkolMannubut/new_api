'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeEndpoint, setActiveEndpoint] = useState<number | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const endpoints = [
    { method: 'POST', path: '/api/auth/login', desc: 'User authentication', icon: '🔐', color: '#ff6b6b', status: 'active' },
    { method: 'POST', path: '/api/auth/register', desc: 'User registration', icon: '📝', color: '#4ecdc4', status: 'active' },
    { method: 'GET', path: '/api/users', desc: 'Get all users', icon: '👥', color: '#45b7d1', status: 'active' },
    { method: 'POST', path: '/api/users', desc: 'Create new user', icon: '👤', color: '#96ceb4', status: 'active' },
    { method: 'GET', path: '/api/orders', desc: 'Get shirt orders', icon: '👕', color: '#feca57', status: 'active' },
    { method: 'POST', path: '/api/orders', desc: 'Create shirt order', icon: '🛒', color: '#ff9ff3', status: 'active' },
    { method: 'GET', path: '/api/orders/stats', desc: 'Get order statistics', icon: '📈', color: '#54a0ff', status: 'active' },
  ]

  const stats = [
    { label: 'Total Endpoints', value: '7', icon: '🔗', trend: '+2' },
    { label: 'Active Users', value: '1.2K', icon: '👥', trend: '+15%' },
    { label: 'API Calls', value: '45.6K', icon: '📈', trend: '+23%' },
    { label: 'Uptime', value: '99.9%', icon: '✅', trend: '+0.1%' },
  ]

  if (!mounted) return null

  return (
    <div className={styles.page}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.grid}></div>
      </div>
      
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.pulse}></span>
            Live API Documentation
          </div>
          <h1 className={styles.title}>
            <span className={styles.gradient}>New API</span>
            <span className={styles.sparkle}>✨</span>
          </h1>
          <p className={styles.subtitle}>
            <span className={styles.tech}>Next.js • TypeScript • MongoDB • JWT</span>
          </p>
        </div>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statTrend}>{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* API Endpoints */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              🚀 API Endpoints
              <span className={styles.count}>{endpoints.length}</span>
            </h2>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              All systems operational
            </div>
          </div>
          
          <div className={styles.endpointsGrid}>
            {endpoints.map((endpoint, index) => (
              <div 
                key={index} 
                className={`${styles.endpointCard} ${activeEndpoint === index ? styles.active : ''}`}
                onMouseEnter={() => setActiveEndpoint(index)}
                onMouseLeave={() => setActiveEndpoint(null)}
                style={{'--accent-color': endpoint.color} as React.CSSProperties}
              >
                <div className={styles.cardGlow}></div>
                <div className={styles.endpointHeader}>
                  <div className={styles.endpointMeta}>
                    <span className={styles.endpointIcon}>{endpoint.icon}</span>
                    <span className={`${styles.method} ${styles[endpoint.method.toLowerCase()]}`}>
                      {endpoint.method}
                    </span>
                    <span className={styles.statusBadge}>{endpoint.status}</span>
                  </div>
                  <div className={styles.responseTime}>~45ms</div>
                </div>
                
                <code className={styles.endpointPath}>
                  <span className={styles.baseUrl}>localhost:3000</span>
                  {endpoint.path}
                </code>
                
                <p className={styles.endpointDesc}>{endpoint.desc}</p>
                
                <div className={styles.cardFooter}>
                  <button className={styles.tryButton}>Try it out</button>
                  <div className={styles.usage}>1.2K calls/day</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3>Ready to get started?</h3>
            <p>Explore our comprehensive API documentation and start building amazing applications.</p>
            <div className={styles.ctas}>
              <a className={styles.primaryCta} href="/dashboard">
                <span>📊</span>
                Open Dashboard
              </a>
              <a className={styles.secondaryCta} href="/docs">
                <span>📚</span>
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}