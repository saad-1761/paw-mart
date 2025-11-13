# PawMart - Your Pet Marketplace

PawMart is a platform where you can find all your favourite pets and pet supplies in one place. Adopt, shop, and care for your pets with ease — all in a secure, user-friendly environment.

**Live URL:** [PawMart](pawmart61.netlify.app)

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [npm Packages](#npm-packages)

---

## Key Features

- **Uniform Layout:** Navbar and footer remain consistent across all pages while main content changes according to the route.

- **Navbar:**

  - Logo, navigation pages, login/register buttons.
  - When logged in, replaced by user name, photo, and sign-out button.
  - "My Listings" and "My Orders" pages appear for logged-in users.

- **Homepage:**

  - Carousel with featured listings.
  - Newsletter section.
  - Button to redirect users to **Pet Supplies** page.

- **Pet Supplies Page:**

  - Displays all pets and products in the marketplace.
  - Search bar for finding pets or supplies.
  - Error page if no results found.

- **Listing Details Page:**

  - Displays all information about a pet or product.
  - Logged-in users can place orders or contact sellers.
  - Protected page (login required).

- **Add Listing Page:**

  - Logged-in users can post pets or products for sale.

- **My Listings Page:**

  - Shows all listings posted by the logged-in user.
  - Users can update or delete their listings.

- **Login & Registration:**

  - **Login triggers:**
    - Clicking login button
    - After registration
    - Trying to access protected pages
    - After signing out
    - Redirects users to intended page after login
    - Password reset option available
  - **Login methods:** Email & password, Google, GitHub
  - **Registration:** Users provide name, photo URL, email & password
  - Verification email required to log in

- **Profile & Update Profile Pages:**

  - Profile photo, name, and sign-out button replace login/register buttons after login
  - Profile page is protected
  - Update Profile page allows users to change name and profile photo

- **Smooth transitions** across pages for better user experience

---

## Tech Stack

- HTML
- Tailwind CSS, DaisyUI
- JavaScript
  - Library: React

---

## npm Packages

- `react-router`
- `react-icons`
- `swiper`
- `motion`
- `firebase`
- `react-toastify`
- `axios`
- `lucide-react`
- `js-pdf`
- `sweetalert2`
