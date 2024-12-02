function showEventDetails(eventId) {
    const eventContent = document.getElementById('eventContent');

    fetch('/events.json')
        .then(response => response.json())
        .then(events => {
            const event = events[eventId];
            if (event) {
                eventContent.innerHTML = `
                    <div class="event-details">
                        <img src="${event.image}" alt="${event.title}" />
                        <div>
                            <h1 class="event-details-title">${event.title}</h1>
                            <p class="event-details-description">${event.description}</p>
                            <a href="${event.link}" class="button is-primary">Más información</a>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error fetching event data:', error));
}
