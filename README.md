# PB SYSTEM - Enterprise Freight Forwarding & Logistics Management

ប្រព័ន្ធគ្រប់គ្រងការនាំចូល-នាំចេញ, ភស្តុភារកម្ម, គយ និងការរាប់ទូកុងតឺន័រ (**PB SYSTEM**) ត្រូវបានធ្វើបច្ចុប្បន្នភាពកម្រិតខ្ពស់ (**Version 2.8.0 Pro**) ជាមួយនឹងការបំពេញ និងដោះស្រាយរាល់សំណូមពរទាំង ៨ ចំណុច៖

---

## 🚀 របៀបបើកដំណើរការកម្មវិធី និងចែកចាយទៅកាន់បុគ្គលិក (Distribution & Offline Sync)

### វិធីទី ១៖ ដំណើរការជា Local Server លើម៉ាស៊ីន Admin (Host Server សម្រាប់ Sync ក្នុង Office)
ពេល Admin បើកលើម៉ាស៊ីនមួយណា ត្រូវយកម៉ាស៊ីននោះជា **Local Host Server**៖
1. បើក Terminal ឬ Command Prompt (CMD) ក្នុង Folder [**`h:\New folder`**](file:///h:/New%20folder)
2. វាយបញ្ជា៖
   ```bash
   node server.js
   ```
3. ប្រព័ន្ធនឹងបង្ហាញ IP ម៉ាស៊ីន Admin ភ្លាមៗ (ឧទាហរណ៍៖ `http://192.168.1.15:3000`)
4. **ម៉ាស៊ីនបុគ្គលិកដទៃទៀត (Staff Machines):**
   - គ្រាន់តែបើក Browser (Chrome, Edge...) វាយ `http://192.168.1.15:3000`
   - រាល់ទិន្នន័យដែល Staff បញ្ចូល នឹងធ្វើការ Sync ចូលទៅកាន់ម៉ាស៊ីន Admin ដោយស្វ័យប្រវត្តិតាមរយៈ Endpoint `/api/sync`។

### វិធីទី ២៖ ប្រើប្រាស់ពេលដាច់ Internet ឬក្រៅ Office (Offline-First Local Storage)
- ប្រសិនបើបុគ្គលិកយកកុំព្យូទ័រទៅបំពេញការងារនៅកំពង់ផែ ឬកន្លែងគ្មាន Internet/LAN៖
- បុគ្គលិកនៅតែអាចបើក [**`index.html`**](file:///h:/New%20folder/index.html) ប្រើប្រាស់បាន ១០០% (ទិន្នន័យរក្សាទុកលើម៉ាស៊ីនផ្ទាល់ខ្លួន)។
- ពេលមាន Internet ឬភ្ជាប់ចូល WiFi ក្រុមហ៊ុនវិញ ប្រព័ន្ធមានមុខងារ **Auto-detect Network Online** នឹង Sync ទិន្នន័យថ្មីៗត្រឡប់មកម៉ាស៊ីន Admin ដោយស្វ័យប្រវត្តិ!

---

## 🔑 គណនីចូលប្រើប្រាស់គំរូ (Default Credentials)

* **Admin Role (អ្នកគ្រប់គ្រងប្រព័ន្ធ - មើលឃើញទិន្នន័យទាំងអស់):**
  * ឈ្មោះគណនី (Username): `admin`
  * ពាក្យសម្ងាត់ (Password): `123`
* **Staff Role (បុគ្គលិកប្រតិបត្តិការ - មើលឃើញតែទិន្នន័យដែលខ្លួនបង្កើត):**
  * ឈ្មោះគណនី (Username): `staff01`
  * ពាក្យសម្ងាត់ (Password): `123`

---

## 🛠 ការដោះស្រាយ និងមុខងារកែប្រែថ្មីៗទាំង ៨ ចំណុច (Detailed Breakdown)

### 1. `/fix 1` - មុខងារ Report បង្ហាញ 15 Rows Per Page (Pagination: Next & Prev)
* តារាង Job Report ត្រូវបានរៀបចំជាប្រព័ន្ធ Pagination ដោយកំណត់យ៉ាងតឹងរ៉ឹង **១៥ ជួរក្នុងមួយទំព័រ (15 rows per page)**។
* មានប៊ូតុង **ទំព័រមុន (Prev)**, **ទំព័របន្ទាប់ (Next)**, និង **លេខទំព័រ (1, 2, 3...)** ងាយស្រួលចុចឆ្លាស់ទំព័រ។
* បង្ហាញជួរទិន្នន័យច្បាស់លាស់ ឧ. `Showing 1 - 15 of 45 Jobs`។
* ពេលវាយស្វែងរកក្នុងប្រអប់ Search ប្រព័ន្ធនឹង Reset ត្រឡប់មកទំព័រទី ១ ដោយស្វ័យប្រវត្តិ។

### 2. `/fix 2` - Auto Update On Time ពេល Import File ឬពេលទិន្នន័យកែប្រែ
* ពេលចុច **Import File Excel** ក្នុងមុខងារ Report ឬ Counting ទិន្នន័យនឹងត្រូវបញ្ចូល និង Refresh គ្រប់ផ្ទាំង (Dashboard, Report, Counting, Costing) ភ្លាមៗ **Real-Time** ដោយមិនបាច់ Reload Page ឡើយ។
* ប្រើប្រាស់ **BroadcastChannel (`pb_system_sync_channel`)** ធ្វើឱ្យ Browser Tabs ទាំងអស់ក្នុងកុំព្យូទ័រ Update ព្រមៗគ្នាភ្លាមៗ។

### 3. `/fix 3` - Dashboard បំបែក Total Job# និង Total Container ដាច់ដោយឡែកពីគ្នា
* **Job / HBL សរុប (Total Job#):** រាប់តែចំនួន Job# ឬ HBL តែមួយគត់ (Unique Job Count) មិនថាក្នុង Job នោះមានទូកុងតឺន័រ ៥ ឬ ១០ ទូក៏ដោយ ក៏រាប់ជា ១ Job ដដែល។
* **ទូ Container សរុប (Total Container):** រាប់ចំនួនទូកុងតឺន័រជាក់ស្តែងទាំងអស់ (Total Physical Containers)។
* បង្ហាញសមាមាត្រទូ Duty vs. Lumsum vs. General យ៉ាងសុក្រឹតលើក្រាហ្វិក Donut Chart។

### 4. `/fix 4` - មុខងារ Counting "Save as PDF" លុប Column Remark និងបង្ហាញ ១១ ជួរឈរតាមការកំណត់
* ពេលចុច **Save as PDF** ក្នុងមុខងារ Counting ប្រព័ន្ធបានដកចេញនូវ Column `Remark` ទាំងស្រុង។
* តារាង PDF ត្រូវបានកំណត់យ៉ាងត្រឹមត្រូវ ១០០% ដោយបង្ហាញត្រឹម **១១ ជួរឈរ (Columns)** ដូចខាងក្រោម៖
  1. `No` (ល.រ)
  2. `Job #`
  3. `MBL`
  4. `HBL`
  5. `CNEE`
  6. `P'KGS`
  7. `Container No`
  8. `Type`
  9. `ETA`
  10. `Clear` (Clear Date)
  11. `FEE` (តម្លៃគិតប្រាក់)
* ទិន្នន័យរៀបរៀងយ៉ាងស្អាតតាមក្បួនបោះពុម្ពផ្លូវការ មិនមានបញ្ហាទំព័រទទេ (Blank Page) ឡើយ។

### 5. `/fix 5` - User Management គ្រប់គ្រងអ្នកប្រើប្រាស់បានពេញលេញ (បង្ហាញគ្រប់ User ទាំងអស់)
* ដោះស្រាយបញ្ហាគណនីចុះឈ្មោះថ្មីមិនបង្ហាញក្នុងតារាង User Management៖
  * គណនីថ្មី (Pending Review) ត្រូវបានបង្ហាញទាំងក្នុង **Pending Approvals Card** ផ្នែកខាងលើ និងបង្ហាញក្នុង **តារាងគ្រប់គ្រង User ទាំងអស់** ជាមួយ Badge ពណ៌ទឹកក្រូច `PENDING APPROVAL`។
  * Admin អាចចុច **✓ Approve** ឬ **✕ Reject** ភ្លាមៗ។
* បន្ថែមប៊ូតុង **"+ បន្ថែម User ថ្មី" (Add User Modal)** សម្រាប់ Admin បង្កើតគណនី Staff, Viewer, Admin ផ្ទាល់ដោយកំណត់ Password និង Role បានភ្លាមៗ។
* Admin អាច Suspend, Reactivate, Reset Password និង Delete User តាមតម្រូវការ។

### 6. `/fix 6` - បន្ថែមមុខងារ Dashboard Notice (Admin Broadcast Announcement)
* បន្ថែមផ្ទាំង **សេចក្តីជូនដំណឹងពី Admin (Broadcast Notice Card)** យ៉ាងស្រស់ស្អាតនៅផ្នែកខាងលើនៃ Dashboard។
* Admin មានប៊ូតុង **"កែប្រែសេចក្តីជូនដំណឹង"** ដើម្បីសរសេរសារប្រាប់ទៅកាន់បុគ្គលិកទាំងអស់ កំណត់កម្រិតអាទិភាព (Urgent, Important, General) និងកាលបរិច្ឆេទ។
* បុគ្គលិកធម្មតា (Staff) អាចមើលឃើញសារជូនដំណឹងនេះ ប៉ុន្តែមិនមានសិទ្ធិកែប្រែឡើយ (Read-only for Staff)។

### 7. `/fix 7` - កែប្រែ Style PB Animation ថ្មី (Futuristic Orbital Halo & Shimmer)
* រចនា Logo PB ឡើងវិញជាមួយចលនា **Futuristic Cyberpunk Motion**៖
  * **Dual Orbital Halos (`pb-orbital-cw` & `pb-orbital-ccw`)**: រង្វង់ពន្លឺ Neon វិលបញ្ច្រាសទិសគ្នាជុំវិញ Logo PB។
  * **Metallic Text Shimmer (`pb-logo-text`)**: អក្សរ PB ចែងចាំងពន្លឺពណ៌ស-ទឹកប៊ិចកម្រិត Premium។
  * **Cyber Glassmorphism Background**: ផ្ទៃខាងក្រោយជាកញ្ចក់រលោង និងស្រមោល Drop-shadow 3D។

### 8. `/fix 8` - ការបែងចែកសិទ្ធិមើលទិន្នន័យ (Role-based Data Scoping)
* **Admin Role:** មើលឃើញទិន្នន័យការងាររបស់បុគ្គលិកទាំងអស់ក្នុងក្រុមហ៊ុន (All Users' Work)។
* **Staff Role:** មើលឃើញតែទិន្នន័យដែលខ្លួនឯងបានបង្កើតប៉ុណ្ណោះ (My Created Records Only) ទាំងក្នុង Report, Request Notes, Costing, និង Tasks។
* លើ Dashboard បង្ហាញ Badge សម្គាល់យ៉ាងច្បាស់ថាអ្នកកំពុងស្ថិតក្នុង Workspace ណា (Admin Workspace ឬ Staff Workspace)។

---

## 🗂 រចនាសម្ព័ន្ធឯកសារក្នុងគម្រោង

* [**`index.html`**](file:///h:/New%20folder/index.html) : កម្មវិធី PB SYSTEM ទាំងមូល (Dashboard, Request Note, Counting, Report, Costing, Tasks, Settings)
* [**`css/style.css`**](file:///h:/New%20folder/css/style.css) : PB Animation Logo, RGB Running Lights, Neon Orbitals, Glassmorphism, 8 Color Themes
* [**`js/i18n.js`**](file:///h:/New%20folder/js/i18n.js) : វចនានុក្រម ៣ ភាសា (ខ្មែរ KM, អង់គ្លេស EN, ចិន ZH)
* [**`js/data.js`**](file:///h:/New%20folder/js/data.js) : ទិន្នន័យគំរូដើមរបស់ប្រព័ន្ធ
* [**`js/app.js`**](file:///h:/New%20folder/js/app.js) : Logic ស្នូល, Pagination, PDF 11 Columns, Notice Modal, Add User Modal, Auto-Sync
* [**`server.js`**](file:///h:/New%20folder/server.js) : Localhost LAN Server (Node.js គ្មាន dependency ខាងក្រៅ) សម្រាប់ Admin Share ក្នុង Office
* [**`README.md`**](file:///h:/New%20folder/README.md) : សៀវភៅណែនាំការប្រើប្រាស់លម្អិត
