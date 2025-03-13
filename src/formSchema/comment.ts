import {z} from 'zod'

const formChema = z.object({
    comment: z.string().min(3, {message:'Комментарий должен содержать минимум 3 слова'})
})
