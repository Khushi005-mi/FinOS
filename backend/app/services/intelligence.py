from sqlalchemy.orm import Session
from app.models.sales import Sales
from app.models.expense import Expense
from app.models.bank_transaction import BankTransaction

def get_total_revenue(db , client_id):
    sales = db.query(Sales).filter(Sales.client_id == client_id).all()
    total_revenue = sum(s.revenue for s in sales if s.revenue)
    return {"total_revenue": round(total_revenue, 2)}

def get_total_expense(db , client_id):
    expense = db.query(Expense).filter(Expense.client_id == client_id).all()
    total_expense = sum(s.amount for s in expense if s. amount)
    return {"total_expense": round(total_expense, 2)}

def get_profit(db,client_id):
    revenue = get_total_revenue(db, client_id)["total_revenue"]
    expenses = get_total_expense(db, client_id)["total_expense"]
    gross_profit   = revenue - expenses
    profit_margin = (gross_profit / revenue * 100) if revenue > 0 else 0
    return {
            "gross_profit": round(gross_profit, 2),
            "profit_margin": round(profit_margin, 2)
    }
# 1. Import BankTransaction at the top
def get_cash_position(db,client_id):
        transactions = db.query(BankTransaction)\
                 .filter(BankTransaction.client_id == client_id)\
                 .all()

        credits = [t for t in transactions if t.type == "credit"]
        debits = [t for t in transactions if t.type == "debit"]
# 4. Sum credits → cash_inflow
        cash_inflow = sum(t.amount for t in credits if t.amount)
        cash_outflow = sum(abs(t.amount) for t in debits if t.amount)
        # 5. Sum debits (use abs() to make them positive) → cash_outflow
# 6. Calculate net_cash = cash_inflow - cash_outflow
        net_cash = cash_inflow - cash_outflow
# 7. Return dict with cash_inflow, cash_outflow, net_cash
        return {
            "cash_inflow": round(cash_inflow, 2),
            "cash_outflow": round(cash_outflow, 2),
            "net_cash": round(net_cash, 2)
        }
# 1. get_revenue_by_product(db, client_id)
def get_revenue_by_product(db, client_id):
  sales = db.query(Sales).filter(Sales.client_id == client_id).all()

  product_revenue = {}
  for s in sales:
    product = s.product or "Unknown"
    if product not in product_revenue:
        product_revenue[product] = 0
    product_revenue[product] += s.revenue or 0

  best_product = max(product_revenue, key=lambda x: product_revenue[x]) if product_revenue else None

  return {
    "revenue_by_product": product_revenue,
    "best_product": best_product
   }
# 1. Variable name: customer_revenue instead of product_revenue
def get_revenue_by_customer(db, client_id):
  sales = db.query(Sales).filter(Sales.client_id == client_id).all()

  customer_revenue = {}
  for s in sales:
    customer = s.customer or "Unknown"
    if customer not in customer_revenue:
        customer_revenue[customer] = 0
    customer_revenue[customer] += s.revenue or 0

  bestest_customer = max(customer_revenue, key=lambda x: customer_revenue[x]) if customer_revenue else None

  return {
    "revenue_by_customer": customer_revenue,
    "best_customer": bestest_customer
   }
