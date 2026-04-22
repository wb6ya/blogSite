// ننتظر حتى يكتمل تحميل الصفحة بالكامل لتجنب الأخطاء
document.addEventListener("DOMContentLoaded", function () {
  
  // 1. تشغيل المحرر (الكود الخاص بك)
  const quill = new Quill('#editor', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
      ],
    },
    placeholder: 'Compose an epic...',
    theme: 'snow',
  });

  // 2. الاستهداف: نبحث عن النموذج (Form) والحقل المخفي
  const form = document.querySelector('form');
  const hiddenInput = document.querySelector('#hiddenContent');

  // نتأكد أن الصفحة الحالية تحتوي فعلاً على النموذج (حتى لا ينهار الكود في صفحات أخرى)
  if (form && hiddenInput) {
    
    // 3. المراقبة: نراقب لحظة ضغط المستخدم على زر "حفظ" أو "إرسال"
    form.addEventListener('submit', function () {
      
      // 4. النقل (الجسر): نسحب كود الـ HTML الذي ولده المحرر
      const htmlContent = quill.root.innerHTML;
      
      // (لمسة هندسية): Quill إذا كان فارغاً يضع <p><br></p>، لذلك ننظفها إذا كانت موجودة
      if (htmlContent === '<p><br></p>') {
          hiddenInput.value = ''; 
      } else {
          // نضع الكود المنسق داخل الحقل المخفي!
          hiddenInput.value = htmlContent;
      }
      
      // بعد تنفيذ هذا السطر، سيُكمل المتصفح عملية الإرسال للسيرفر تلقائياً
      // وسيكون الحقل المخفي حاملاً للبيانات بدلاً من أن يكون undefined
    });
  }
});