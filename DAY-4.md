🌟 Day 4 – Dec 11 (Security, Cleanup & Frontend Integration)
✅ What I Worked On Today

Corrected a critical issue where an API key was accidentally exposed.

Implemented a proper .gitignore to safeguard environment variables.

Added a clean .env.example file to follow best open-source practices.

Rotated the OpenRouter API key to ensure full security.

Completed frontend–backend integration with consistent POST/GET routing.

Validated dynamic data rendering on all UI sections.

⚙️ Technical Progress

Added entries to .gitignore:

backend/.env

venv/

build and cache folders

Ensured the real .env file is excluded from version control.

Updated frontend API calls to match backend method requirements.

Confirmed that all endpoints return correct JSON and integrate seamlessly with the UI.

📘 What I Learned

Why sensitive keys must never be committed to GitHub.

How CodeRabbit detects vulnerabilities and warns about unsafe patterns.

Proper workflow for creating .env and .env.example.

How frontend routing interacts with backend POST/GET rules.

How to debug network requests cleanly via developer tools.

🐛 Challenges Faced

Accidentally committed .env before ignoring it → resolved by rotating the key and adding .gitignore.

.gitignore not visible initially → enabled hidden files in VS Code.

API fetch mismatch (GET vs POST) → updated methods in the frontend.

Ensured all local backend tests passed before continuing development.

🎉 Today’s Result

A secure, well-structured backend connected flawlessly to the frontend, following proper open-source and environment variable standards.
