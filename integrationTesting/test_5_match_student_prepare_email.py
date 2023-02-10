from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_match_student_prepare_email():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument("--window-size=1920x1080")
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/Match_Student")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    companyDropdown = driver.find_element(By.CSS_SELECTOR, "[data-testid='company-dropdown']")
    companyDropdown.click()

    companySelect = driver.find_element(By.XPATH, "//tbody/tr[1]/td[3]/select[1]/option[2]")
    companySelect.click()

    statusDropdown = driver.find_element(By.CSS_SELECTOR, "[data-testid='status-dropdown']")
    select = Select(statusDropdown)

    #selecting the value
    select.select_by_value("PENDING_CONFIRMATION")

    driver.get("http://localhost:5221/Prepare_Email")

    studentId = driver.find_element(By.XPATH, "//tbody/tr/td[1]")
    studentId = studentId.text

    studentName= driver.find_element(By.XPATH, "//tbody/tr/td[2]")
    studentName = studentName.text

    studentPreference = driver.find_element(By.XPATH, "//tbody/tr/td[3]")
    studentPreference = studentPreference.text

    studentCompany = driver.find_element(By.XPATH, "//tbody/tr/td[4]")
    studentCompany = studentCompany.text

    # #Refreshing the webpage
    # driver.refresh()        

    # companyDropdownAfter = driver.find_element(By.CSS_SELECTOR, "[data-testid='company-dropdown']")  
    # selectCompany = Select(companyDropdownAfter)
    # selected_company_option = selectCompany.first_selected_option
    # selected_company_value = selected_company_option.get_attribute("value")

    # statusDropdownAfter = driver.find_element(By.CSS_SELECTOR, "[data-testid='status-dropdown']")
    # selectStatus = Select(statusDropdownAfter)
    # selected_status_option = selectStatus.first_selected_option
    # selected_status_value = selected_status_option.get_attribute("value")

    assert studentId == "S12345678A" 
    assert studentName == "Balqis"
    assert studentPreference == "MAD"
    assert studentCompany == "Company WWW"

    driver.quit()