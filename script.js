document.addEventListener('DOMContentLoaded', function() {
    // สร้างปุ่ม Sign In
    const signInButton = document.querySelector('.custom_sign_in_button');
    const buttonText = signInButton.getAttribute('data-text');
    signInButton.innerText = buttonText;
    
    signInButton.addEventListener('click', function() {
        // เปิดหน้าต่างเข้าสู่ระบบ
        signIn();
    });

    function signIn() {
        const loginUri = document.querySelector('#custom_sign_in').getAttribute('data-login_uri');
        const authWindow = window.open(loginUri, 'authWindow', 'width=500,height=600');
        
        if (!authWindow) {
            console.error('Failed to open authentication window.');
            return;
        }

        // ฟังก์ชันฟังข้อความ
        handleAuthResult();
    }

    function handleAuthResult() {
        window.addEventListener('message', function(event) {
            console.log('Message received:', event);
            
            // ตรวจสอบต้นทางของข้อความ
            if (event.origin !== new URL(document.querySelector('#custom_sign_in').getAttribute('data-login_uri')).origin) {
                console.warn('Message received from unauthorized origin:', event.origin);
                return;
            }

            const data = event.data;
            if (data.status === 'success') {
                console.log('Login successful, User ID:', data.userId);
                
                // แสดงข้อมูลหรือส่งต่อไปยังหน้าอื่น
                localStorage.setItem('status', data.status);
                localStorage.setItem('userId', data.userId);

                 // เรียกใช้ฟังก์ชัน callback
                        const callbackFunctionName = signInButton.getAttribute('data-callback');
                        if (typeof window[callbackFunctionName] === 'function') {
                            window[callbackFunctionName](data);
                        }
                //window.location.href = 'http://127.0.0.1:5500/client-test/home.html';
            } else {
                console.error('Login failed or invalid status:', data);
            }
        });
    }
});

    // Callback function
    function onSignInSuccess(data) {
        console.log('Callback received:', data);
        // ทำอะไรบางอย่างหลังจากเข้าสู่ระบบสำเร็จ
    }