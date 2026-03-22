from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Django superuser created specifically for Selenium test automation
TEST_USERNAME = "seleniumuser"
TEST_PASSWORD = "aarushi123@"

BASE_URL = "http://localhost:5173"


def test_login_success():
    """Verify that a registered user can log in with valid credentials and is redirected to the homepage."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/login")

    # Enter valid credentials
    wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys(TEST_USERNAME)
    driver.find_element(By.ID, "password").send_keys(TEST_PASSWORD)
    driver.find_element(By.ID, "loginBtn").click()

    # Verify redirect to homepage on successful login
    wait.until(EC.url_to_be(f"{BASE_URL}/"))
    assert f"{BASE_URL}/" in driver.current_url

    driver.quit()


def test_login_invalid_password():
    """Verify that login fails and an error message is shown when an incorrect password is entered."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/login")

    # Enter valid username but wrong password
    wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys(TEST_USERNAME)
    driver.find_element(By.ID, "password").send_keys("wrongpassword")
    driver.find_element(By.ID, "loginBtn").click()

    # Verify error message is displayed and user is NOT redirected
    error_msg = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[contains(text(),'Invalid') or contains(text(),'incorrect') or contains(text(),'wrong')]")
    ))
    assert error_msg.is_displayed()
    assert driver.current_url == f"{BASE_URL}/login"

    driver.quit()


def test_login_empty_fields():
    """Verify that login fails when username and password fields are left empty."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/login")

    # Attempt login without entering any credentials
    wait.until(EC.presence_of_element_located((By.ID, "loginBtn"))).click()

    # Verify user remains on login page
    assert driver.current_url == f"{BASE_URL}/login"

    driver.quit()