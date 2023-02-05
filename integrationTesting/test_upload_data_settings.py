from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os


def test_uploadData_settings():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument("--window-size=1920x1080")
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/settings")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    
    periodButton = driver.find_element(By.CSS_SELECTOR, "[data-testid='update-period-button']")
    periodButton.click()   

    driver.implicitly_wait(1)

    monthSelector = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]")
    monthSelector.click()  

    decemberSelector = driver.find_element(By.XPATH, "//span[contains(text(),'December')]")
    decemberSelector.click() 

    resetClick = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[6]/div[1]/span[1]")
    resetClick.click()

    startDate = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[6]/div[1]/span[1]")
    startDate.click()

    endDate = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[5]/div[4]/span[1]")
    endDate.click()

    confirmResumeDirectoryButton = driver.find_element(By.CSS_SELECTOR, "[data-testid='confirm-internship-period']")
    confirmResumeDirectoryButton.click()

    wait = WebDriverWait(driver, 10)

    submitButton = wait.until(EC.element_to_be_clickable((driver.find_element(By.CSS_SELECTOR, "[data-testid='save-btn']"))))
    submitButton.click()

    driver.get("http://localhost:5221/Upload_Data")

    internshipPeriod = driver.find_element(By.XPATH, "//b[contains(text(),'24/12/2023 - 24/01/2024')]")
    text = internshipPeriod.text

    # Retrieve the text of the toast message
    assert text == "24/12/2023 - 24/01/2024"

    driver.quit()