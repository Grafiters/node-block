class Invoices {
    constructor(data){
        this.data = data
    }

    getListPlan(){
        return this.data.map(entities => ({
            invoice_id: entities.Invoice.id,
            package_id: entities.Invoice.package_id,
            payment_method_id: entities.Invoice.payment_method_id,
            payment_due_date: entities.Invoice.payment_due_date,
            payment_due: entities.Invoice.payment_due,
            total_amount: entities.Invoice.total_amount,
            status: entities.Invoice.status
        }))
    }

    getSinglePlan(){
        return {
            invoice_id: entities.Invoice.id,
            package_id: entities.Invoice.package_id,
            payment_method_id: entities.Invoice.payment_method_id,
            payment_due_date: entities.Invoice.payment_due_date,
            payment_due: entities.Invoice.payment_due,
            total_amount: entities.Invoice.total_amount,
            status: entities.Invoice.status
        }
    }

    getCreateInoviceResponse(invoice){
        console.log(invoice);
        return {
            invoice_id: this.data.invoice_id,
            package_id: invoice.data.package_id,
            payment_method_id: invoice.data.payment_method_id,
            payment_due_date: invoice.data.payment_due_date,
            total_amount: invoice.data.total_amount,
            status: invoice.data.status
        }
    }
}
  
module.exports = Invoices