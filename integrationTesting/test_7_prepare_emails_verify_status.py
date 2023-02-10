from selenium.webdriver.chrome.options import Options                                                                                                                      
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select , WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_check_prepare_emails():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument("--window-size=1920x1080")
    driver = webdriver.Chrome(service=ChromeService(executable_path=ChromeDriverManager().install()), options=chrome_options)

    driver.get("http://localhost:5221/Match_Student")

    title = driver.title
    assert title == "IAS"

    driver.implicitly_wait(0.5)

    # Balqis selection
    firstStatusDropdown = driver.find_element(By.CSS_SELECTOR, "[data-testid='status-dropdown']")
    firstSelect = Select(firstStatusDropdown)

    # selecting the value
    firstSelect.select_by_value("PENDING_CONFIRMATION")

    # Lala selection
    secondSelectDropdown = driver.find_element(By.XPATH, "//tbody/tr[2]/td[4]/select[1]")
    secondSelectDropdown.click()
    secondSelect = Select(secondSelectDropdown)

    # selecting the value
    secondSelect.select_by_value("CONFIRMED")
    
    driver.get("http://localhost:5221/Prepare_Email")

    driver.implicitly_wait(0.5)

    # Get different credentials
    emailTable = driver.find_element(By.ID, "email-table") 
    rows = emailTable.find_elements(By.XPATH, "//tbody/tr")
    # Assert that Balqis credentials there
    assert len(rows) == 1
    # Assert that Lala credentials there
    # assert status == "Email prepared. Missing resume(s) from Balqis"

    driver.quit()