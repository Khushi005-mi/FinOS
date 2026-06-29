import os
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_report(data, client_id):
    os.makedirs("reports", exist_ok=True)
    date = datetime.now().strftime("%Y-%m-%d")
    file_path = f"reports/{client_id}_{date}.pdf"
    doc = SimpleDocTemplate(file_path, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("FinOS Financial Report", styles["Title"]))
    elements.append(Spacer(1, 20))
    elements.append(Paragraph("GreenLeaf Supplies", styles["Heading1"]))
    elements.append(Paragraph(f"Generated: {date}", styles["Normal"]))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph("REVENUE", styles["Heading2"]))
    elements.append(Paragraph(f"Total Revenue: Rs {data['revenue']['total_revenue']:,}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    elements.append(Paragraph("EXPENSES", styles["Heading2"]))
    elements.append(Paragraph(f"Total Expenses: Rs {data['expenses']['total_expense']:,}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    elements.append(Paragraph("PROFIT", styles["Heading2"]))
    elements.append(Paragraph(f"Gross Profit: Rs {data['profit']['gross_profit']:,}", styles["Normal"]))
    elements.append(Paragraph(f"Profit Margin: {data['profit']['profit_margin']}%", styles["Normal"]))
    elements.append(Spacer(1, 12))

    elements.append(Paragraph("CASH POSITION", styles["Heading2"]))
    elements.append(Paragraph(f"Cash Inflow: Rs {data['cash']['cash_inflow']:,}", styles["Normal"]))
    elements.append(Paragraph(f"Cash Outflow: Rs {data['cash']['cash_outflow']:,}", styles["Normal"]))
    elements.append(Paragraph(f"Net Cash: Rs {data['cash']['net_cash']:,}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    elements.append(Paragraph("TOP CUSTOMER", styles["Heading2"]))
    elements.append(Paragraph(f"{data['customers']['best_customer']}", styles["Normal"]))
    elements.append(Spacer(1, 20))

    doc.build(elements)
    return file_path
