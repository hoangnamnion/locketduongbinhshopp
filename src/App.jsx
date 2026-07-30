import React from 'react';
import { Check, Star, Shield, Zap, Sparkles } from 'lucide-react';

function App() {
  const plans = [
    {
      id: 'basic',
      name: 'Locket Gold Basic',
      price: '20,000',
      originalPrice: '40,000 đ',
      duration: 'Sử dụng 1 Ngày',
      features: [
        'Mở khóa Locket Gold',
        'Không quảng cáo',
        'Upload ảnh từ thư viện',
        'Quay video Lockets 5s',
        'Thay đổi icon Locket',
        'Hỗ trợ bảo hành 1 ngày'
      ],
      recommended: false,
      delay: 'delay-100'
    },
    {
      id: 'pro',
      name: 'Locket Gold Pro',
      price: '79,000',
      originalPrice: '158,000 đ',
      duration: 'Hạn dùng 1 Năm',
      features: [
        'Mở khóa Locket Gold',
        'Không quảng cáo',
        'Upload ảnh từ thư viện',
        'Quay video Lockets 5s',
        'Xem ai đã xem Lockets của bạn',
        'Thay đổi icon Locket',
        'Mở khóa không giới hạn bạn bè',
        'Bảo hành đến khi web ngừng HĐ'
      ],
      recommended: true,
      delay: 'delay-200'
    },
    {
      id: 'premium',
      name: 'Locket Gold Premium',
      price: '109,000',
      originalPrice: '272,500 đ',
      duration: 'Sử dụng Vĩnh Viễn',
      features: [
        'Toàn bộ tính năng gói Pro',
        'Quay video Lockets lên đến 15s',
        'Nhận huy hiệu Locket Gold',
        'Đội ngũ hỗ trợ ưu tiên 24/7',
        'Bảo hành TRỌN ĐỜI vĩnh viễn'
      ],
      recommended: false,
      delay: 'delay-300'
    }
  ];

  return (
    <>
      <div className="container">
        <nav>
          <div className="nav-brand">
            <div className="brand-icon">L</div>
            LocketGold
          </div>
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '10px 24px', fontSize: '14px' }}>
            <Shield size={16} /> An Toàn 100%
          </button>
        </nav>
        
        <main className="py-16 text-center animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-4" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
            <Sparkles size={20} />
            <span>Nâng Cấp Locket Gold Tự Động</span>
          </div>
          
          <h1 className="title-glow" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '24px', lineHeight: '1.1' }}>
            Trải Nghiệm Premium.<br />Không Cần Mật Khẩu.
          </h1>
          
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', marginBottom: '48px' }}>
            Hệ thống xử lý tự động trong 5 giây. Không yêu cầu đăng nhập iCloud hay Apple ID. Quản lý trực tiếp qua Username công khai.
          </p>
          
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.id} className={`glass-panel pricing-card animate-fade-up ${plan.delay} ${plan.recommended ? 'card-popular' : ''}`}>
                {plan.recommended && <div className="badge">Đáng mua nhất</div>}
                
                <h3 className="plan-name">{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span className="plan-original-price">{plan.originalPrice}</span>
                  <span style={{ fontSize: '12px', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Giảm 50%</span>
                </div>
                
                <div className="plan-price">
                  {plan.price} <span className="plan-currency">đ</span>
                </div>
                
                <div className="plan-duration">{plan.duration}</div>
                
                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <div className="feature-icon"><Check size={18} strokeWidth={3} /></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'}`}>
                  Mua Ngay <Zap size={18} />
                </button>
              </div>
            ))}
          </div>
        </main>
        
        <footer className="py-16 text-center" style={{ color: 'var(--text-muted)', fontSize: '14px', borderTop: '1px solid var(--glass-border)', marginTop: '64px' }}>
          <p>© 2026 LocketGold Premium Shop. Bản quyền thuộc LocketGold.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
