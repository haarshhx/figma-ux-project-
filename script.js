document.addEventListener('DOMContentLoaded', () => {
    // --- Form Validation and Logic ---
    const form = document.getElementById('demoForm');
    
    // Function to populate date selectors
    const populateDateSelectors = () => {
        const daySelect = document.getElementById('day');
        const yearSelect = document.getElementById('year');
        const currentYear = new Date().getFullYear();

        // Populate days (1-31)
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Populate years (current year and 100 years back)
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    };
    
    populateDateSelectors();

    // Function to validate a single field
    const validateField = (field) => {
        const formGroup = field.closest('.form-group') || field.closest('.radio-group');
        if (!formGroup) return true;

        let isValid = true;
        let value = field.value || "";

        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value) && value.trim() !== '';
        } else if (field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
            isValid = value.trim() !== '';
        } else if (field.type === 'radio') {
            const radios = document.querySelectorAll(`input[name="${field.name}"]`);
            isValid = Array.from(radios).some(radio => radio.checked);
        }

        if (isValid) {
            formGroup.classList.remove('error');
        } else {
            formGroup.classList.add('error');
        }
        return isValid;
    };
    
    // Function to handle the date selectors validation
    const validateDate = () => {
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const dateGroup = document.querySelector('[data-field="date"]');
        
        if (day && month && year) {
            dateGroup.classList.remove('error');
            return true;
        } else {
            dateGroup.classList.add('error');
            return false;
        }
    };

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Validate all required fields
        const requiredFields = document.querySelectorAll('.form-group[data-field] input, .form-group[data-field] select, .radio-group[data-field] input[type="radio"]');

        requiredFields.forEach(field => {
            // If it's a radio button, we validate the group as a whole
            if (field.type === 'radio') {
                const radioGroup = field.closest('.radio-group');
                const checkedRadio = radioGroup.querySelector('input[type="radio"]:checked');
                if (!checkedRadio) {
                    radioGroup.classList.add('error');
                    isFormValid = false;
                } else {
                    radioGroup.classList.remove('error');
                }
            } else {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            }
        });
        
        // Handle date validation separately
        if (!validateDate()) {
            isFormValid = false;
        }

        if (isFormValid) {
            console.log('Form is valid and ready to submit.');
            alert('Form submitted successfully!');
        }
    });

    // --- Card Hover Logic (Removed) ---
    // The previous hover logic for the cards has been removed as per the new design.
    // The new design only requires a simple scale transformation on hover, which is handled directly in CSS.
});