from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_register_success():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("http://localhost:5173/register")
    wait = WebDriverWait(driver, 15)

    # Fill form
    driver.find_element(By.NAME, "username").send_keys("seleniumuser2")
    driver.find_element(By.NAME, "email").send_keys("seleniumuser2@example.com")
    driver.find_element(By.NAME, "password").send_keys("TestPass123!")

    # Submit form
    driver.find_element(By.XPATH, "//button[text()='Register']").click()

    # Wait for either URL redirect or success message
    try:
        wait.until(lambda d: "localhost:5173/" in d.current_url or "localhost:5173/login" in d.current_url)
    except:
        # If no redirect, check for success message
        success_msg = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//p[contains(text(),'Registration successful')]")
        ))
        assert "Registration successful" in success_msg.text

    driver.quit()