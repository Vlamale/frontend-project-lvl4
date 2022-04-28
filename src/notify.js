import { toast } from 'react-toastify'

const notifySuccess = (text) => toast.success(text)

const notifyError = (text) => toast.error(text)

export {
    notifySuccess,
    notifyError
}