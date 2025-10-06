
document.addEventListener('DOMContentLoaded', () => {
  displayBookingDetails();

  // Booking form confirmation (without navigating to another page)
  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault(); // prevent page reload
      const pickup = document.getElementById('pickup').value;
      const drop = document.getElementById('drop').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const cab = document.getElementById('cab').value;

      // Save booking data in localStorage (demo)
      const bookingData = {
        bookingId: 'CB'+Date.now(),
        pickup,
        drop,
        date,
        time,
        cab,
        distance: Math.floor(Math.random()*15)+5, // demo distance 5-20 km
        fare: 0, // can calculate fare based on cab type and distance
        promoApplied: document.getElementById('promoInput').value || null,
        driver: {
          name: "Ravi Kumar",
          phone: "+91 98765 43210",
          vehicle: "Mini - KA01AB1234",
          rating: 4.9
        }
      };
      // Calculate fare demo
      let rate = 0;
      switch(cab){
        case "Mini": rate=35; break;
        case "Sedan": rate=50; break;
        case "SUV": rate=80; break;
        case "Luxury": rate=120; break;
      }
      bookingData.fare = rate * bookingData.distance;
      if(bookingData.promoApplied === "SAVE50") bookingData.fare = bookingData.fare/2;

      localStorage.setItem('currentBooking', JSON.stringify(bookingData));
      alert(`Booking Confirmed!\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nTime: ${time}\nCab: ${cab}`);
      displayBookingDetails();
      this.reset();
    });
  }
});

// Smooth scroll to booking section
function scrollToBooking() {
  const el = document.getElementById('booking');
  if(el) el.scrollIntoView({ behavior: 'smooth' });
}

// Apply promo code
function applyPromo() {
  const code = document.getElementById('promoInput').value.trim();
  const msg = document.getElementById('promoMessage');
  if(code === "SAVE50") {
    msg.textContent = "Promo applied! You get 50% off (demo).";
    msg.style.color = "#4caf50";
  } else {
    msg.textContent = "Invalid promo code.";
    msg.style.color = "red";
  }
}

// Display booking details if present
function displayBookingDetails() {
  const bookingConfirmation = document.getElementById('bookingConfirmation');
  if(!bookingConfirmation) return;

  const bookingData = localStorage.getItem('currentBooking');
  if (!bookingData) {
    bookingConfirmation.innerHTML = `
      <div class="no-booking">
        <h2>No Booking Found</h2>
        <p class="muted" style="margin: 20px 0">You don't have any active bookings at the moment.</p>
        <button class="btn" onclick="scrollToBooking()">Book a Ride Now</button>
      </div>
    `;
    return;
  }

  const booking = JSON.parse(bookingData);
  const dateObj = new Date(booking.date);
  const formattedDate = dateObj.toLocaleDateString('en-IN', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  bookingConfirmation.innerHTML = `
    <h2>🎉 Booking Confirmed!</h2>
    <div class="status-badge">✓ Your cab is on the way!</div>
    <div id="bookingDetails">
      <div class="detail-row"><span class="detail-label">Booking ID</span><span class="detail-value">${booking.bookingId}</span></div>
      <div class="detail-row"><span class="detail-label">Pickup Location</span><span class="detail-value">${booking.pickup}</span></div>
      <div class="detail-row"><span class="detail-label">Drop Location</span><span class="detail-value">${booking.drop}</span></div>
      <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${formattedDate}</span></div>
      <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${booking.time}</span></div>
      <div class="detail-row"><span class="detail-label">Cab Type</span><span class="detail-value">${booking.cab}</span></div>
      <div class="detail-row"><span class="detail-label">Distance</span><span class="detail-value">${booking.distance} km (approx.)</span></div>
      ${booking.promoApplied ? `<div class="detail-row"><span class="detail-label">Promo Applied</span><span class="detail-value" style="color:#4caf50">✓ ${booking.promoApplied}</span></div>` : ''}
      <div class="detail-row"><span class="detail-label">Estimated Fare</span><span class="detail-value" style="color:var(--accent); font-size:18px">₹${booking.fare}</span></div>
    </div>
    <div class="driver-info">
      <h4 style="margin:0 0 12px">👤 Driver Details</h4>
      <p style="margin:6px 0"><strong>Name:</strong> ${booking.driver.name}</p>
      <p style="margin:6px 0"><strong>Phone:</strong> <a href="tel:${booking.driver.phone}" style="color: var(--accent)">${booking.driver.phone}</a></p>
      <p style="margin:6px 0"><strong>Vehicle:</strong> ${booking.driver.vehicle}</p>
      <p style="margin:6px 0"><strong>Rating:</strong> ⭐ ${booking.driver.rating} / 5.0</p>
    </div>
    <div class="action-buttons">
      <button class="btn outline" onclick="cancelBooking()">Cancel Booking</button>
      <button class="btn" onclick="trackRide()">Track Ride</button>
    </div>
    <div style="margin-top: 24px; text-align: center">
      <button class="btn outline" onclick="scrollToBooking()">← Book Another Ride</button>
    </div>
  `;
}

function cancelBooking() {
  if (confirm('Are you sure you want to cancel this booking?')) {
    localStorage.removeItem('currentBooking');
    alert('Booking cancelled successfully! No charges applied.');
    displayBookingDetails();
  }
}

function trackRide() {
  alert('Track Ride feature coming soon! You will receive SMS updates about your driver\'s location. (Demo)');
}

function printBooking() {
  window.print();
}

