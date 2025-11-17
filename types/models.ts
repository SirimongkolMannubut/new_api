import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../libs/client'
import argon2 from 'argon2'

// users model
export const UserSchema = z.object({
  uuid: z.uuid().default(uuidv4),
  name: z.string().min(1, 'Name is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .transform(async (plain) => {
      return await argon2.hash(plain, { type: argon2.argon2id })
    }),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
})
// wallets model
export const WalletSchema = z.object({
  uuid: z.uuid().default(uuidv4),
  owner: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  desc: z.string().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
})
// transactions model
export const TransactionSchema = z.object({
  uuid: z.string().uuid().default(uuidv4),
  wallet: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  desc: z.string().optional(),
  amount: z.number().min(0, 'Amount must be non-negative'),
  type: z.union([z.literal(-1), z.literal(1)]),
  date: z.coerce.date().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
})

export const UpdateTransactionSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  desc: z.string().optional(),
  amount: z.number().min(0, 'Amount must be non-negative').optional(),
  type: z.union([z.literal(-1), z.literal(1)]).optional(),
  date: z.coerce.date().optional(),
  updatedAt: z.coerce.date().default(() => new Date()),
})

// shirt order model
export const ShirtOrderSchema = z.object({
  uuid: z.uuid().default(uuidv4),
  orderNumber: z.string().default(() => `ORD-${Date.now()}`),
  customerName: z.string().min(1, 'ชื่อ is required'),
  firstName: z.string().optional(),
  lastName: z.string().min(1, 'นามสกุล is required'),
  surname: z.string().optional(),
  phone: z.string().regex(/^08[0-9]-[0-9]{3}-[0-9]{4}$/, 'เบอร์โทรศัพท์ format: 08x-xxx-xxxx'),
  email: z.string().email('Invalid email format').optional(),
  shippingAddress: z.string().min(1, 'ที่อยู่สำหรับจัดส่ง is required'),
  postalCode: z.string().min(5, 'รหัสไปรษณีย์ is required'),
  notes: z.string().optional(),
  shirtType: z.string().default('เสื้อเฉลิมฉลองเมือง 243 ปี'),
  quantity: z.number().min(1, 'จำนวนเสื้อ is required').default(1),
  price: z.number().min(0, 'ราคา must be non-negative').default(0),
  totalAmount: z.number().min(0, 'ยอดรวม must be non-negative').default(0),
  shippingMethod: z.literal('postal').default('postal'),
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']).default('pending'),
  paymentStatus: z.enum(['unpaid', 'paid', 'refunded']).default('unpaid'),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
})

// order statistics model
export const OrderStatsSchema = z.object({
  totalOrders: z.number().default(0),
  totalShirts: z.number().default(0),
  totalRevenue: z.number().default(0),
  statusCounts: z.object({
    pending: z.number().default(0),
    confirmed: z.number().default(0),
    processing: z.number().default(0),
    shipped: z.number().default(0),
    delivered: z.number().default(0),
    cancelled: z.number().default(0),
  }).default(() => ({
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  })),
})

// model types
export type User = z.infer<typeof UserSchema>
export type Wallet = z.infer<typeof WalletSchema>
export type Transaction = z.infer<typeof TransactionSchema>
export type ShirtOrder = z.infer<typeof ShirtOrderSchema>
export type OrderStats = z.infer<typeof OrderStatsSchema>
// model collections
export const users = db.collection<User>('users')
export const wallets = db.collection<Wallet>('wallets')
export const transactions = db.collection<Transaction>('transactions')
export const shirtOrders = db.collection<ShirtOrder>('shirtOrders')