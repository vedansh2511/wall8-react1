import welcomeIllustration from '/src/assets/placeholder.svg';
import { ThemeProvider } from '@/context/ThemeContext';

export function WelcomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex flex-col items-center p-6">
        {/* Header Section */}
        <header className="text-center py-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            Welcome to Wall8
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-4">
            Optimize your credit card usage and maximize your rewards seamlessly.
          </p>
          <button
            className="mt-6 px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark"
            onClick={() => (window.location.href = "/login")}
          >
            Get Started
          </button>
        </header>

        {/* Illustration */}
        <div className="mt-8 flex justify-center">
          <img
            src={welcomeIllustration}
            alt="Welcome illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Features Section */}
        <section className="mt-12 w-full max-w-screen-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card p-4 bg-gradient-to-br from-white to-gray-100 shadow-md rounded-lg text-center">
              <h3 className="font-bold text-lg">Track Spending</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Keep an eye on your credit card expenses effortlessly.
              </p>
            </div>
            <div className="feature-card p-4 bg-gradient-to-br from-white to-gray-100 shadow-md rounded-lg text-center">
              <h3 className="font-bold text-lg">Maximize Rewards</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Get the best out of your credit cards with smart recommendations.
              </p>
            </div>
            <div className="feature-card p-4 bg-gradient-to-br from-white to-gray-100 shadow-md rounded-lg text-center">
              <h3 className="font-bold text-lg">Secure and Easy</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your data is encrypted and securely stored for peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-12 text-center text-sm text-muted-foreground py-4">
          &copy; {new Date().getFullYear()} Wall8. All rights reserved. |
          <a href="/privacy" className="ml-2 underline">
            Privacy Policy
          </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}
