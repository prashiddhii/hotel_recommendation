from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://localhost:5173"

# Test user credentials for registration
TEST_USERNAME = "seleniumuser2"
TEST_EMAIL = "seleniumuser2@example.com"
TEST_PASSWORD = "TestPass123!"


def test_register_success():
    """Verify that a new user can register successfully and is redirected to the homepage or login page."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 15)

    driver.get(f"{BASE_URL}/register")

    # Fill in registration form
    driver.find_element(By.NAME, "username").send_keys(TEST_USERNAME)
    driver.find_element(By.NAME, "email").send_keys(TEST_EMAIL)
    driver.find_element(By.NAME, "password").send_keys(TEST_PASSWORD)
    driver.find_element(By.XPATH, "//button[text()='Register']").click()

    # After successful registration, app may redirect or show a success message
    try:
        wait.until(lambda d: f"{BASE_URL}/" in d.current_url or f"{BASE_URL}/login" in d.current_url)
    except Exception:
        # If no redirect, check for success message on the same page
        success_msg = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//p[contains(text(),'Registration successful')]")
        ))
        assert "Registration successful" in success_msg.text

    driver.quit()

def test_register_empty_fields():
    """Verify that registration fails when required fields are left empty."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 15)

    driver.get(f"{BASE_URL}/register")

    # Attempt to submit registration form without filling any fields
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//button[text()='Register']")
    )).click()

    # Verify user remains on the register page
    assert f"{BASE_URL}/register" in driver.current_url

    driver.quit()