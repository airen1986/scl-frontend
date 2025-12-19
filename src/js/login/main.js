const DEFAULT_API_BASE_URL = 'https://hub.computelite.com';
const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');
const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;
const REDIRECT_TARGET = 'home-page.html';
const REQUEST_TIMEOUT_MS = 10000;


const form = document.querySelector('#loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const submitButton = document.getElementById('loginSubmit');    

const statusHost = createStatusHost(form);

if (form) {
  form.addEventListener('submit', handleSubmit);
}

function createStatusHost(formElement) {
  const host = document.createElement('div');
  host.id = 'loginStatus';
  host.className = 'mb-3';

  const header = formElement.querySelector('.mb-4');
  if (header) {
    header.insertAdjacentElement('afterend', host);
  } else {
    formElement.prepend(host);
  }

  return host;
}

function renderStatus(level, message) {
  if (!statusHost) return;

  statusHost.innerHTML = '';
  if (!level) return;

  const alert = document.createElement('div');
  alert.role = 'alert';
  alert.className = `alert alert-${level === 'error' ? 'danger' : 'success'} mb-0`;
  alert.textContent = message;
  statusHost.append(alert);
}

function clearFieldStates() {
  [emailInput, passwordInput].forEach((input) => {
    if (!input) return;
    input.classList.remove('is-invalid');

    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.remove();
    }
  });
}

function showFieldError(input, message) {
  if (!input) return;
  input.classList.add('is-invalid');

  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains('invalid-feedback')) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback d-block small mt-1';
    input.insertAdjacentElement('afterend', feedback);
  }

  feedback.textContent = message;
}

function validateFields(email, password) {
  let isValid = true;

  if (!email) {
    showFieldError(emailInput, 'Email is required.');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError(emailInput, 'Enter a valid email address.');
    isValid = false;
  }

  if (!password) {
    showFieldError(passwordInput, 'Password is required.');
    isValid = false;
  } else if (password.length < 6) {
    showFieldError(passwordInput, 'Use at least 6 characters.');
    isValid = false;
  }

  if (!isValid) {
    renderStatus('error', 'Please fix the highlighted fields.');
    const firstInvalid = form?.querySelector('.is-invalid');
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }

  return isValid;
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!form) return;

  renderStatus(null);
  clearFieldStates();

  const email = (emailInput?.value ?? '').trim();
  const password = passwordInput?.value ?? '';

  if (!validateFields(email, password)) {
    return;
  }

  setSubmitting(true);

  try {
    await authenticate({ email, password });
    renderStatus('success', 'Signed in successfully. Redirecting...');
    window.setTimeout(() => {
      window.location.assign(REDIRECT_TARGET);
    }, 500);
  } catch (error) {
    renderStatus('error', error.message || 'Unable to sign in. Please try again.');
  } finally {
    setSubmitting(false);
  }
}

async function authenticate(credentials) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response));
    }

    if (response.status === 204) {
      return {};
    }

    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }

    throw new Error(error.message || 'Network error. Please try again.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function extractErrorMessage(response) {
  try {
    const data = await response.json();
    if (data?.message) return data.message;
    if (data?.error) return data.error;
  } catch (_) {
    // Ignore JSON parse errors
  }

  try {
    const text = await response.text();
    if (text) return text;
  } catch (_) {
    // Ignore text parse errors
  }

  return 'Unable to sign in.';
}

function setSubmitting(isSubmitting) {
  if (!submitButton) return;

  submitButton.disabled = isSubmitting;

  if (isSubmitting) {
    if (!submitButton.dataset.originalLabel) {
      submitButton.dataset.originalLabel = submitButton.textContent ?? 'Sign In';
    }

    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Signing in...';
  } else if (submitButton.dataset.originalLabel) {
    submitButton.textContent = submitButton.dataset.originalLabel;
  }
}
