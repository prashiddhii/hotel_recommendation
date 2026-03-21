from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_login_success():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    
    driver.get("http://localhost:5173/login")

    wait = WebDriverWait(driver, 10)

    # Find fields
    username = wait.until(EC.presence_of_element_located((By.ID, "username")))
    password = driver.find_element(By.ID, "password")

    # Input data
    username.send_keys("seleniumuser")
    password.send_keys("aarushi123@")

    # Click login
    driver.find_element(By.ID, "loginBtn").click()

    # Wait for redirect (homepage)
    wait.until(EC.url_to_be("http://localhost:5173/"))

    # Assertion
    assert "localhost:5173/" in driver.current_url

    driver.quit()