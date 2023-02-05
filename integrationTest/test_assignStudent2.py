
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_assign_student():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/Match_Student")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    companyDropdown = driver.find_element(By.CSS_SELECTOR, "[data-testid='company-dropdown']")
    select = Select(companyDropdown)

    #selecting a value
    select.select_by_value("2")

    statusDropdown = driver.find_element(By.CSS_SELECTOR, "[data-testid='status-dropdown']")
    select = Select(statusDropdown)

    #selecting the value
    select.select_by_value("PENDING_CONFIRMATION")
    
    # Retrieve the text of the toast message
    element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, "go2344853693")))

    #Refreshing the webpage
    driver.refresh()        

    companyDropdownAfter = driver.find_element(By.CSS_SELECTOR, "[data-testid='company-dropdown']")  
    selectCompany = Select(companyDropdownAfter)
    selected_company_option = selectCompany.first_selected_option
    selected_company_value = selected_company_option.get_attribute("value")

    statusDropdownAfter = driver.find_element(By.CSS_SELECTOR, "[data-testid='status-dropdown']")
    selectStatus = Select(statusDropdownAfter)
    selected_status_option = selectStatus.first_selected_option
    selected_status_value = selected_status_option.get_attribute("value")

    assert selected_company_value == "2" and selected_status_value == "PENDING_CONFIRMATION"

    driver.quit()