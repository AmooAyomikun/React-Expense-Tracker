import { 
  faUtensils, 
  faHome, 
  faCar, 
  faLightbulb, 
  faGraduationCap, 
  faHeartbeat, 
  faGamepad, 
  faBriefcase, // Added for Freelance
  faWallet,
  faGifts
} from '@fortawesome/free-solid-svg-icons'

const categories = [
  // 🔽 EXPENSE CATEGORIES
  {
    id: 'food-groceries',
    name: 'Food & Groceries',
    icon: faUtensils,
    color: '#10B981',
    type: 'expense' // 💥 Explicitly typed
  },
  {
    id: 'housing',
    name: 'Housing',
    icon: faHome,
    color: '#3B82F6',
    type: 'expense'
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: faCar,
    color: '#F59E0B',
    type: 'expense'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: faLightbulb,
    color: '#6366F1',
    type: 'expense'
  },
  {
    id: 'education',
    name: 'Education',
    icon: faGraduationCap,
    color: '#8B5CF6',
    type: 'expense'
  },
  {
    id: 'health',
    name: 'Health',
    icon: faHeartbeat,
    color: '#EF4444',
    type: 'expense'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: faGamepad,
    color: '#EC4899',
    type: 'expense'
  },

  {
    id: 'salary',
    name: 'Salary',
    icon: faWallet,
    color: '#22C55E',
    type: 'income' 
  },
  {
    id: 'freelance',
    name: 'Freelance & Business',
    icon: faBriefcase,
    color: '#06B6D4',
    type: 'income'
  },
  {
    id: 'gift',
    name: 'Gifts',
    icon: faGifts,
    color: '#22c55e9a',
    type: 'income'
  }
]

export default categories