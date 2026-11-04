# EmailJS setup
1. Sign up at https://www.emailjs.com, add an Email Service (Gmail) -> copy Service ID.
2. Email Templates -> Create. Set "To email" to your own address.
   Subject: {{her_name}} answered your proposal!
   Body:
   Her name: {{her_name}}
   Time: {{time}}

   Q1: {{q1}}
   Q2: {{q2}}
   Q3: {{q3}}

   Final question (Kya tum meri girlfriend banogi?): {{final_answer}}
   Dodge attempts used: {{attempts}}
   -> copy Template ID.
3. Account -> API Keys -> copy Public Key.
4. Paste all three into CFG.emailjs in src/App.jsx (and her name in CFG.her).
5. npm install && npm run dev
