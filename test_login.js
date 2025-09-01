// Simple test script to test login
const testLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/registration/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log(`🔐 Testing: ${email} / ${password}`);
    console.log(`📊 Status: ${response.status}`);
    console.log(`📝 Response:`, data);
    console.log('---');
    
    return data;
  } catch (error) {
    console.error(`❌ Error testing ${email}:`, error.message);
    return null;
  }
};

// Test with your existing user
console.log('🧪 Testing login with your existing user...');
console.log('📧 Email: prateekvajpai1854@gmail.com');
console.log('🔑 Try these common passwords:');
console.log('');

// Common passwords to try
const passwordsToTry = [
  'password123456',
  '123456789012',
  'prateek123456',
  'bajpai123456',
  'admin123456',
  'test123456',
  'user123456'
];

// Test each password
passwordsToTry.forEach(password => {
  testLogin('prateekvajpai1854@gmail.com', password);
});

console.log('💡 If none work, the password might be different.');
console.log('💡 Check what password you used during registration.');
