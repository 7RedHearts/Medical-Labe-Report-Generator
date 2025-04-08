document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const labReportForm = document.getElementById('lab-report-form');
    const testTypeSelect = document.getElementById('test-type');
    const testFieldsContainer = document.getElementById('test-fields-container');
    const reportPreview = document.getElementById('report-preview');
    const printReportBtn = document.getElementById('print-report');
    const resetFormBtn = document.getElementById('reset-form');
    const viewPdfBtn = document.getElementById('view-pdf');
    const shareReportBtn = document.getElementById('share-report');
    
    // Add mobile fixed toolbar for small screens
    createMobileToolbar();
    window.addEventListener('resize', checkMobileToolbar);
    
    // Event listeners
    testTypeSelect.addEventListener('change', loadTestFields);
    labReportForm.addEventListener('submit', generateReport);
    printReportBtn.addEventListener('click', printReport);
    resetFormBtn.addEventListener('click', resetForm);
    viewPdfBtn.addEventListener('click', generatePDF);
    shareReportBtn.addEventListener('click', shareReport);
    
    // Create mobile toolbar
    function createMobileToolbar() {
        if (window.innerWidth <= 768) {
            // Create the toolbar if it doesn't exist
            if (!document.querySelector('.fixed-bottom-toolbar')) {
                const toolbar = document.createElement('div');
                toolbar.className = 'fixed-bottom-toolbar';
                toolbar.innerHTML = `
                    <button class="btn btn-sm btn-primary" id="mobile-print-btn" disabled>
                        <i class="fas fa-print"></i> Print
                    </button>
                    <button class="btn btn-sm btn-primary" id="mobile-pdf-btn" disabled>
                        <i class="fas fa-file-pdf"></i> PDF
                    </button>
                    <button class="btn btn-sm btn-primary" id="mobile-share-btn" disabled>
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                `;
                document.body.appendChild(toolbar);
                
                // Add event listeners to mobile buttons
                document.getElementById('mobile-print-btn').addEventListener('click', printReport);
                document.getElementById('mobile-pdf-btn').addEventListener('click', generatePDF);
                document.getElementById('mobile-share-btn').addEventListener('click', shareReport);
            }
        } else {
            // Remove the toolbar if window size is larger
            const toolbar = document.querySelector('.fixed-bottom-toolbar');
            if (toolbar) {
                toolbar.remove();
            }
        }
    }
    
    // Check and update mobile toolbar on resize
    function checkMobileToolbar() {
        createMobileToolbar();
    }
    
    // Load test fields based on selected test type
    function loadTestFields() {
        const testType = testTypeSelect.value;
        if (!testType) {
            testFieldsContainer.innerHTML = `
                <div class="alert alert-info" role="alert">
                    <i class="fas fa-info-circle me-2"></i>
                    Please select a test type to see the relevant fields.
                </div>
            `;
            return;
        }
        
        // Get the test data for the selected test type
        const testData = testTypes[testType];
        
        if (!testData) {
            testFieldsContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Test data not found for the selected test type.
                </div>
            `;
            return;
        }
        
        // Generate HTML for test fields
        let fieldsHTML = `
            <div class="d-flex align-items-center mb-3">
                <i class="fas fa-microscope fs-4 me-2 text-primary"></i>
                <h4 class="mb-0">${testData.name} Parameters</h4>
            </div>
        `;
        
        testData.parameters.forEach(param => {
            fieldsHTML += `
                <div class="mb-3">
                    <label for="${param.id}" class="form-label fw-semibold">${param.name} (${param.unit})</label>
                    <div class="input-group">
                        <input type="number" step="any" class="form-control" id="${param.id}" 
                               data-param-name="${param.name}" data-unit="${param.unit}" 
                               data-min="${param.normalRange.min}" data-max="${param.normalRange.max}" required>
                        <span class="input-group-text">${param.unit}</span>
                    </div>
                    <small class="form-text text-muted">
                        <i class="fas fa-info-circle me-1"></i>
                        Normal Range: ${param.normalRange.min} - ${param.normalRange.max} ${param.unit}
                    </small>
                </div>
            `;
        });
        
        testFieldsContainer.innerHTML = fieldsHTML;
    }
    
    // Generate report based on form data
    function generateReport(event) {
        event.preventDefault();
        
        // Get form values
        const serialNumber = document.getElementById('serial-number').value;
        const reportDate = document.getElementById('report-date').value;
        const patientName = document.getElementById('patient-name').value;
        const patientAge = document.getElementById('patient-age').value;
        const patientGender = document.getElementById('patient-gender').value;
        const testType = testTypeSelect.value;
        
        // Validate required fields
        if (!serialNumber || !reportDate || !patientName || !patientAge || !patientGender || !testType) {
            alert('Please fill out all required fields.');
            return;
        }
        
        const testData = testTypes[testType];
        if (!testData) {
            alert('Test type data not found.');
            return;
        }
        
        // Format date
        const formattedDate = new Date(reportDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Collect test parameters and results
        const paramResults = [];
        let abnormalCount = 0;
        
        testData.parameters.forEach(param => {
            const inputField = document.getElementById(param.id);
            const value = parseFloat(inputField.value);
            
            // Validate test result
            if (isNaN(value)) {
                alert(`Please enter a valid number for ${param.name}.`);
                return;
            }
            
            // Determine if result is normal or abnormal
            const isNormal = value >= param.normalRange.min && value <= param.normalRange.max;
            const status = isNormal ? 'Normal' : 'Abnormal';
            
            if (!isNormal) {
                abnormalCount++;
            }
            
            paramResults.push({
                name: param.name,
                value: value,
                unit: param.unit,
                normalRange: `${param.normalRange.min} - ${param.normalRange.max}`,
                status: status,
                isNormal: isNormal
            });
        });
        
        // Generate suggestions based on results
        let suggestions = '';
        if (abnormalCount === 0) {
            suggestions = `
                <p class="mb-0">All parameters are within normal ranges. Continue maintaining a healthy lifestyle with regular check-ups.</p>
            `;
        } else {
            suggestions = `
                <p class="mb-0">${abnormalCount} parameter(s) are outside normal ranges. Please consult with your healthcare provider for proper evaluation and guidance.</p>
            `;
            
            // Add specific suggestions based on the test type
            if (testType === 'sugar' || testType === 'hba1c') {
                suggestions += `
                    <ul class="recommendations-list mt-2 mb-0">
                        <li>Monitor your diet and avoid excessive sugar intake.</li>
                        <li>Regular physical activity is recommended.</li>
                        <li>Follow up with your doctor for further evaluation.</li>
                    </ul>
                `;
            } else if (testType === 'lipid') {
                suggestions += `
                    <ul class="recommendations-list mt-2 mb-0">
                        <li>Consider a heart-healthy diet low in saturated fats.</li>
                        <li>Regular exercise is beneficial for lipid management.</li>
                        <li>Follow up with your doctor for possible medication if needed.</li>
                    </ul>
                `;
            } else if (testType === 'lft' || testType === 'rft') {
                suggestions += `
                    <ul class="recommendations-list mt-2 mb-0">
                        <li>Ensure adequate hydration.</li>
                        <li>Follow up with your doctor for a more comprehensive evaluation.</li>
                        <li>Additional tests may be recommended.</li>
                    </ul>
                `;
            }
        }
        
        // Generate HTML for report
        const reportHTML = `
            <div class="report-container print-section">
                <!-- Report Title - Only for screen display, will be hidden in print -->
                <h2 class="report-title print-hide">
                    ${testData.name} - Laboratory Report
                </h2>
                
                <!-- Patient and Report Information Section - Horizontal Layout -->
                <div class="print-section">
                    <div class="patient-info-row">
                        <div class="patient-info-card">
                            <div class="info-title">
                                <i class="fas fa-user-circle"></i>
                                Patient Information
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Name:</div>
                                <div class="info-value">${patientName}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Age:</div>
                                <div class="info-value">${patientAge} years</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Gender:</div>
                                <div class="info-value">${patientGender}</div>
                            </div>
                        </div>
                        
                        <div class="patient-info-card">
                            <div class="info-title">
                                <i class="fas fa-clipboard-list"></i>
                                Report Details
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Serial No:</div>
                                <div class="info-value">${serialNumber}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Date:</div>
                                <div class="info-value">${formattedDate}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Test Type:</div>
                                <div class="info-value">${testData.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Test Results Section -->
                <div class="print-section">
                    <div class="info-title mb-3">
                        <i class="fas fa-vial"></i>
                        Test Results
                    </div>
                    
                    <div class="table-responsive">
                        <table class="results-table">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Result</th>
                                    <th>Unit</th>
                                    <th>Normal Range</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${paramResults.map(result => `
                                    <tr>
                                        <td>${result.name}</td>
                                        <td class="test-value ${result.isNormal ? '' : 'abnormal-result'}">${result.value}</td>
                                        <td>${result.unit}</td>
                                        <td>${result.normalRange}</td>
                                        <td>
                                            <div class="status-indicator ${result.isNormal ? 'status-normal' : 'status-abnormal'}">
                                                <i class="fas ${result.isNormal ? 'fa-check-circle me-1' : 'fa-exclamation-circle me-1'}"></i>
                                                ${result.status}
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Medical Recommendations Section -->
                <div class="print-section">
                    <div class="recommendations-card">
                        <div class="recommendations-title">
                            <i class="fas fa-comment-medical"></i>
                            Medical Recommendations
                        </div>
                        
                        ${suggestions}
                    </div>
                </div>
                
                <!-- Signatures Section -->
                <div class="signature-section print-section">
                    <div class="signature-block">
                        <div class="signature-line"></div>
                        <div class="signature-title">Lab Technician</div>
                    </div>
                    
                    <div class="signature-block">
                        <div class="signature-line"></div>
                        <div class="signature-title">Physician</div>
                    </div>
                </div>
                
                <!-- Disclaimer Note - Will not appear in print -->
                <div class="report-footer print-hide mt-4">
                    <p class="text-center text-muted small">This is a computer-generated report. No signature required for digital copies.</p>
                </div>
            </div>
        `;
        
        // Update report preview
        reportPreview.innerHTML = reportHTML;
        
        // Enable print, PDF, and share buttons
        printReportBtn.disabled = false;
        viewPdfBtn.disabled = false;
        shareReportBtn.disabled = false;
        
        // Enable mobile buttons too if they exist
        const mobilePrintBtn = document.getElementById('mobile-print-btn');
        const mobilePdfBtn = document.getElementById('mobile-pdf-btn');
        const mobileShareBtn = document.getElementById('mobile-share-btn');
        
        if (mobilePrintBtn) mobilePrintBtn.disabled = false;
        if (mobilePdfBtn) mobilePdfBtn.disabled = false;
        if (mobileShareBtn) mobileShareBtn.disabled = false;
    }
    
    // Print the generated report
    function printReport() {
        window.print();
    }
    
    // Generate PDF from the report
    function generatePDF() {
        // Show a loading indicator
        const loadingHTML = `
            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75" style="z-index: 1000;">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h5>Generating PDF...</h5>
            </div>
        `;
        const loadingIndicator = document.createElement('div');
        loadingIndicator.innerHTML = loadingHTML;
        document.body.appendChild(loadingIndicator.firstElementChild);
        
        // Get patient name for the PDF filename
        const patientName = document.getElementById('patient-name').value.replace(/\s+/g, '_');
        const testType = document.getElementById('test-type').options[document.getElementById('test-type').selectedIndex].text;
        
        // Get report content
        const reportContainer = document.querySelector('.report-container');
        
        // Use html2canvas and jsPDF
        html2canvas(reportContainer, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            // Initialize jsPDF
            const { jsPDF } = window.jspdf;
            
            // Create PDF document (A4 size)
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Add the canvas as an image
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 5; // top margin
            
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            
            // Save the PDF with a filename
            pdf.save(`${patientName}_${testType}_Lab_Report.pdf`);
            
            // Remove loading indicator
            document.body.removeChild(document.body.lastChild);
        }).catch(error => {
            console.error('Error generating PDF:', error);
            // Remove loading indicator
            document.body.removeChild(document.body.lastChild);
            
            // Show error message
            alert('Error generating PDF. Please try again.');
        });
    }
    
    // Share the report via Web Share API (if supported) or fallback to clipboard
    function shareReport() {
        // Get patient details
        const patientName = document.getElementById('patient-name').value;
        const testType = document.getElementById('test-type').options[document.getElementById('test-type').selectedIndex].text;
        
        // First generate a PDF to share
        const loadingHTML = `
            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75" style="z-index: 1000;">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h5>Preparing report for sharing...</h5>
            </div>
        `;
        const loadingIndicator = document.createElement('div');
        loadingIndicator.innerHTML = loadingHTML;
        document.body.appendChild(loadingIndicator.firstElementChild);
        
        // Get report content
        const reportContainer = document.querySelector('.report-container');
        
        // Use html2canvas to capture the report
        html2canvas(reportContainer, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            // Convert to blob for sharing
            canvas.toBlob(async (blob) => {
                // Remove loading indicator
                document.body.removeChild(document.body.lastChild);
                
                // Create file for sharing
                const file = new File([blob], `${patientName}_${testType}_Lab_Report.png`, { type: 'image/png' });
                
                // Check if Web Share API is supported
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: `${testType} Lab Report for ${patientName}`,
                            text: `Medical Lab Report: ${testType} results for ${patientName}`,
                            files: [file]
                        });
                        console.log('Report shared successfully');
                    } catch (error) {
                        console.error('Error sharing report:', error);
                        
                        // Fallback to clipboard
                        fallbackToClipboard(canvas);
                    }
                } else {
                    // Fallback to clipboard if Web Share API is not supported
                    fallbackToClipboard(canvas);
                }
            }, 'image/png');
        }).catch(error => {
            console.error('Error preparing report for sharing:', error);
            // Remove loading indicator
            document.body.removeChild(document.body.lastChild);
            
            // Show error message
            alert('Error preparing report for sharing. Please try again.');
        });
    }
    
    // Fallback to clipboard if Web Share API is not supported
    function fallbackToClipboard(canvas) {
        // Create a modal to show the image and copy link
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'shareModal';
        modal.tabIndex = '-1';
        modal.setAttribute('aria-labelledby', 'shareModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        
        // Get patient name for the title
        const patientName = document.getElementById('patient-name').value;
        const testType = document.getElementById('test-type').options[document.getElementById('test-type').selectedIndex].text;
        
        // Set modal content
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="shareModalLabel">Share ${testType} Report for ${patientName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>Your browser doesn't support direct sharing. Copy the image below:</p>
                        <div class="mb-3">
                            <img id="shareImage" class="img-fluid border" style="max-height: 50vh;" />
                        </div>
                        <button id="copyImageBtn" class="btn btn-primary">
                            <i class="fas fa-copy me-2"></i>Copy Image to Clipboard
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Create Bootstrap modal instance
        const modalInstance = new bootstrap.Modal(modal);
        
        // Show modal
        modalInstance.show();
        
        // Set image source
        const shareImage = document.getElementById('shareImage');
        shareImage.src = canvas.toDataURL('image/png');
        
        // Add copy functionality
        document.getElementById('copyImageBtn').addEventListener('click', async () => {
            try {
                // Convert canvas to blob
                const blob = await new Promise(resolve => canvas.toBlob(resolve));
                
                // Create ClipboardItem
                const item = new ClipboardItem({ 'image/png': blob });
                
                // Write to clipboard
                await navigator.clipboard.write([item]);
                
                // Show success message
                const copyBtn = document.getElementById('copyImageBtn');
                copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
                copyBtn.classList.remove('btn-primary');
                copyBtn.classList.add('btn-success');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy me-2"></i>Copy Image to Clipboard';
                    copyBtn.classList.remove('btn-success');
                    copyBtn.classList.add('btn-primary');
                }, 2000);
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                alert('Failed to copy to clipboard. Please try manually saving the image.');
            }
        });
        
        // Clean up when modal is closed
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Reset the form
    function resetForm() {
        labReportForm.reset();
        testFieldsContainer.innerHTML = `
            <div class="alert alert-info" role="alert">
                <i class="fas fa-info-circle me-2"></i>
                Please select a test type to see the relevant fields.
            </div>
        `;
        reportPreview.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-file-medical fa-5x text-muted mb-3"></i>
                <h4 class="text-muted">Your report will appear here after generation</h4>
                <p class="text-muted">Fill out the form and click 'Generate Report'</p>
            </div>
        `;
        printReportBtn.disabled = true;
        viewPdfBtn.disabled = true;
        shareReportBtn.disabled = true;
        
        // Disable mobile buttons too if they exist
        const mobilePrintBtn = document.getElementById('mobile-print-btn');
        const mobilePdfBtn = document.getElementById('mobile-pdf-btn');
        const mobileShareBtn = document.getElementById('mobile-share-btn');
        
        if (mobilePrintBtn) mobilePrintBtn.disabled = true;
        if (mobilePdfBtn) mobilePdfBtn.disabled = true;
        if (mobileShareBtn) mobileShareBtn.disabled = true;
    }
});