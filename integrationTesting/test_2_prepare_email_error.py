from selenium.webdriver.chrome.options import Options                                                                                                                          
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_prepare_email_no_resume():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument("--window-size=1920x1080")
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/Prepare_Email")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    generateEmail = driver.find_element(By.ID, "email-btn")
    generateEmail.click()

    wait = WebDriverWait(driver, 20)

    toast = wait.until(EC.element_to_be_clickable((driver.find_element(By.CLASS_NAME, "go3958317564"))))
    toast = toast.text

    assert toast == "Email prepared. Missing resume(s) from Student 8"

    driver.quit()