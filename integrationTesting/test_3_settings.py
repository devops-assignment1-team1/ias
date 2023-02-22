from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_settings_page():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument("--window-size=1920x1080")
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/Settings")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    wait = WebDriverWait(driver, 20)

    resumeDirectoryButton = wait.until(EC.element_to_be_clickable((driver.find_element(By.XPATH, "//body/div[@id='root']/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/button[1]"))))
    resumeDirectoryButton.click()   

    resumeDirectoryInput = driver.find_element(By.CSS_SELECTOR, "[data-testid='resume-dir']")
    resumeDirectoryInput.send_keys("eexports/resume")

    confirmResumeDirectoryButton = wait.until(EC.element_to_be_clickable((driver.find_element(By.CSS_SELECTOR, "[data-testid='confirm-resume-dir']"))))
    confirmResumeDirectoryButton.click()

    emailDirectoryButton = driver.find_element(By.CSS_SELECTOR, "[data-testid='email-dir-button']")
    emailDirectoryButton.click()   

    emailDirectoryInput = driver.find_element(By.CSS_SELECTOR, "[data-testid='email-dir']")
    emailDirectoryInput.send_keys("eexports/email")

    confirmEmailDirectoryButton = driver.find_element(By.CSS_SELECTOR, "[data-testid='confirm-email-dir']")
    confirmEmailDirectoryButton.click()   

    periodButton = driver.find_element(By.CSS_SELECTOR, "[data-testid='update-period-button']")
    periodButton.click()   

    driver.implicitly_wait(1)

    monthSelector = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]")
    monthSelector.click()  

    monthSelector = driver.find_element(By.XPATH, "//span[contains(text(),'July')]")
    monthSelector.click() 

    resetClick = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[6]/div[1]/span[1]")
    resetClick.click()

    startDate = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[6]/div[1]/span[1]")
    startDate.click()

    endDate = driver.find_element(By.XPATH, "//body/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[5]/div[4]/span[1]")
    endDate.click()

    confirmResumeDirectoryButton = driver.find_element(By.CSS_SELECTOR, "[data-testid='confirm-internship-period']")
    confirmResumeDirectoryButton.click()

    submitButton = wait.until(EC.element_to_be_clickable((driver.find_element(By.CSS_SELECTOR, "[data-testid='save-btn']"))))
    submitButton.click()
    
    #refresh the webpage
    driver.refresh()

    emailDirectory = driver.find_element(By.XPATH, "//body/div[@id='root']/div[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]")
    emailDirectoryText=emailDirectory.text

    resumeDirectory = driver.find_element(By.XPATH, "//body/div[@id='root']/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/div[1]")
    resumeDirectoryText=resumeDirectory.text

    internshipPeriod = driver.find_element(By.XPATH, "//body/div[@id='root']/div[1]/div[1]/div[3]/div[4]/div[1]/div[1]/div[1]")
    internshipPeriodText=internshipPeriod.text

    assert emailDirectoryText == "eexports/email" 
    assert resumeDirectoryText == "eexports/resume" 
    assert internshipPeriodText == "23/07/2023 - 23/08/2023"

    driver.quit()