import React, { lazy, Suspense } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useEffect } from 'react';
import { lazyLoad, PageLoader } from './utils/lazyLoad';

// Critical components loaded immediately
import Activation from "./pages/activation";
import Homepage from "./pages/homepage";
import { WhatsAppButton } from './components/WhatsAppButton';

// Lazy load heavy components
const Dashboard = lazyLoad(() => import("./pages/dashboard"));
const Send = lazyLoad(() => import("./pages/send"));
const History = lazyLoad(() => import("./pages/history"));
const Charts = lazyLoad(() => import("./pages/charts"));
const Settings = lazyLoad(() => import("./pages/settings"));
const AdminPanel = lazyLoad(() => import("./pages/admin"));
const Sidebar = lazy(() => import("./components/sidebar"));
const Header = lazy(() => import("./components/header"));
const NotFound = lazyLoad(() => import("./pages/not-found"));
const Pricing = lazyLoad(() => import('@/pages/pricing'));
const TelegramSupport = lazy(() => import('./components/TelegramSupport'));
const AccessDenied = lazy(() => import('./components/AccessDenied').then(m => ({ default: m.AccessDenied })));
const LanguageProvider = lazy(() => import('./components/MultiLanguage').then(m => ({ default: m.LanguageProvider })));
const GoogleAnalytics = lazy(() => import('@/components/GoogleAnalytics'));

// Lazy load legal pages
const Terms = lazyLoad(() => import('./pages/terms'));
const Privacy = lazyLoad(() => import('./pages/privacy'));
const FAQ = lazyLoad(() => import('./pages/faq'));
const RefundPolicy = lazyLoad(() => import('./pages/refund'));
const AMLKYCPolicy = lazyLoad(() => import('./pages/aml-kyc'));
const DMCANotice = lazyLoad(() => import('./pages/dmca'));
const Blog = lazyLoad(() => import('./pages/blog'));
const KnowledgeBase = lazyLoad(() => import('./pages/knowledge-base'));
const APIDocs = lazyLoad(() => import('./pages/api-docs'));

// Lazy load heavy UI components
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const AgeVerification = lazy(() => import('./components/AgeVerification'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));

function AppContent() {
  useKeyboardShortcuts();
  const { isAuthenticated, isLoading, hasActiveSubscription, subscriptionStatus, user, checkSubscription, logout } = useAuth();
  
  // Initialize dark mode by default
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Show activation page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Switch>
          <Route path="/activate" component={Activation} />
          <Route path="/home" component={Homepage} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/faq" component={FAQ} />
          <Route path="/refund" component={RefundPolicy} />
          <Route path="/aml-kyc" component={AMLKYCPolicy} />
          <Route path="/dmca" component={DMCANotice} />
          <Route path="/blog" component={Blog} />
          <Route path="/knowledge-base" component={KnowledgeBase} />
          <Route path="/api-docs" component={APIDocs} />
          <Route path="/">
            <Redirect to="/activate" />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <WhatsAppButton />
      </>
    );
  }

  // If user has a rejected subscription, show access denied page
  if (isAuthenticated && subscriptionStatus === 'rejected') {
    return (
      <div className="relative">
        <Suspense fallback={<PageLoader />}>
          <AccessDenied />
          <TelegramSupport />
        </Suspense>
        <WhatsAppButton />
      </div>
    );
  }

  // If user is authenticated but doesn't have active subscription, show pricing
  if (isAuthenticated && !hasActiveSubscription) {
    return (
      <div className="relative">
        <Pricing
          user={user!}
          onSubscriptionComplete={checkSubscription}
          onLogout={logout}
          onBackToHome={() => window.location.href = '/home'}
        />
        <Suspense fallback={null}>
          <TelegramSupport />
        </Suspense>
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <Suspense fallback={<PageLoader />}>
        <Sidebar />
      </Suspense>
      <div className="min-h-screen pt-[68px]">
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="px-2 py-3 sm:p-6 pb-20">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/home" component={Dashboard} />
            <Route path="/send" component={Send} />
            <Route path="/history" component={History} />
            <Route path="/charts" component={Charts} />
            <Route path="/settings" component={Settings} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/blog" component={Blog} />
            <Route path="/knowledge-base" component={KnowledgeBase} />
            <Route path="/api-docs" component={APIDocs} />
            <Route path="/aml-kyc" component={AMLKYCPolicy} />
            <Route path="/dmca" component={DMCANotice} />
            <Route path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login">
              <Redirect to="/home" />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Suspense fallback={null}>
        <TelegramSupport />
      </Suspense>
      <WhatsAppButton />
    </div>
  );
}

function App() {
  // Open Telegram link when app visibility changes
  React.useEffect(() => {
    let hasOpenedTelegram = false;

    const handleVisibilityChange = () => {
      if (document.hidden && !hasOpenedTelegram) {
        hasOpenedTelegram = true;
        window.open('https://t.me/Henryphilipbolt', '_blank');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageLoader />}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Suspense fallback={null}>
                <GoogleAnalytics />
              </Suspense>
              <Toaster />
              <Suspense fallback={null}>
                <AgeVerification />
                <CookieConsent />
                <ExitIntentPopup />
              </Suspense>
              <AppContent />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;