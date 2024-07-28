document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');

    const sections = document.querySelectorAll('.fade-in-on-scroll');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    const contactForm = document.getElementById('contactForm');
    let isSubmitting = false;

    const handleSubmit = function (event) {
        event.preventDefault();
        console.log('Form submitted');

        if (isSubmitting) return;

        isSubmitting = true;

        const formData = new FormData(contactForm);

        fetch('/Contact/Submit', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => {
                isSubmitting = false;
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button-class'
                    },
                    buttonsStyling: false
                });

                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to send message. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button-class'
                    },
                    buttonsStyling: false
                });
                isSubmitting = false;
            });
    };

    if (contactForm && !contactForm.getAttribute('data-listener-added')) {
        contactForm.addEventListener('submit', handleSubmit);
        contactForm.setAttribute('data-listener-added', 'true');
        console.log('Event listener added');
    } else {
        console.log('Event listener already added or form not found');
    }
});