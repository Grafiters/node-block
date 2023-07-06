class Invoices {
    constructor(data){
        this.data = data
    }

    getListPlan(){
        return this.data.map(entities => ({
            invoice_id: entities.Inovices.id,
            package_id: entities.Inovices.package_id,
            payment_method_id: entities.Inovices.payment_method_id,
            payment_due_date: entities.Inovices.payment_due_date,
            payment_due: entities.Inovices.payment_due,
            total_amount: entities.Inovices.total_amount,
            status: entities.Inovices.status
        }))
    }

    getSinglePlan(){
        return {
            invoice_id: entities.Inovices.id,
            package_id: entities.Inovices.package_id,
            payment_method_id: entities.Inovices.payment_method_id,
            payment_due_date: entities.Inovices.payment_due_date,
            payment_due: entities.Inovices.payment_due,
            total_amount: entities.Inovices.total_amount,
            status: entities.Inovices.status
        }
    }

    getCreateInoviceResponse(invoice){
        return {
            invoice_id: this.data.invoice_id,
            package_id: invoice.package_id,
            payment_method_id: invoice.payment_method_id,
            payment_due_date: invoice.payment_due_date,
            total_amount: invoice.total_amount,
            status: invoice.status
        }
    }
}
  
module.exports = {
    Invoices
}