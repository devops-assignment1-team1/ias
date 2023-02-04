from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os


def test_uploadData_MatchStudent():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/Upload_Data")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    #finding the student upload
    studentUploadButton = driver.find_element(By.ID, "student-upload")
    studentUploadButton.click()
    # includes both search bar and search "go" button

    studentchooseFile = driver.find_element(By.ID, "student-upload-file")
    studentFile =  os.path.join(os.getcwd(), 'TestData', 'StudentData.xlsx')
   # absolute_path = os.path.abspath(relative_path)

    studentchooseFile.send_keys(studentFile)

    studentConfirmButton = driver.find_element(By.ID, "student-confirm")
    studentConfirmButton.click()

     #finding the company upload
    companyUploadButton = driver.find_element(By.ID, "company-upload")
    companyUploadButton.click()

    #choose file button in pop up
    chooseCompanyFile = driver.find_element(By.ID, "company-upload-file")
    companyFile =  os.path.join(os.getcwd(), 'TestData', 'CompanyData.xlsx')
   # absolute_path = os.path.abspath(relative_path)

    chooseCompanyFile.send_keys(companyFile)

    companyConfirmButton = driver.find_element(By.ID, "company-confirm")
    companyConfirmButton.click()

    driver.get("http://localhost:5221/Match_Student")

    company_dropdown = driver.find_element(By.CSS_SELECTOR, "[data-testid='company-dropdown']")
    company_dropdown.click()  

    #The data testid is ever changing
    companyDropdownAfter = driver.find_element(By.XPATH, "//tbody/tr[1]/td[3]/select[1]/option[2]")  
    companyOptions = companyDropdownAfter.text

    # Retrieve the text of the toast message
    assert companyOptions == "Company WWW - Intern"

    driver.quit()