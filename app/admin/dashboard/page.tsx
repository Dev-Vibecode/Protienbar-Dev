'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  LogOut,
  Package
} from 'lucide-react';
import { products } from '@/lib/products';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (!isAuth) return null;

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,480',
      change: '+24%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Orders Today',
      value: '47',
      change: '+12%',
      icon: ShoppingBag,
      color: 'text-purple',
      bgColor: 'bg-purple/10'
    },
    {
      title: 'Active Subscribers',
      value: '1,204',
      change: '+8%',
      icon: Users,
      color: 'text-pink',
      bgColor: 'bg-pink/10'
    },
    {
      title: 'Avg Order Value',
      value: '$18.60',
      change: '-2%',
      icon: TrendingUp,
      color: 'text-brown',
      bgColor: 'bg-brown/10'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Arjun K.', product: 'Choco Blast', amount: '$15.00', status: 'Delivered' },
    { id: '#1235', customer: 'Priya M.', product: 'Berry Burn', amount: '$12.50', status: 'Shipped' },
    { id: '#1236', customer: 'Sam T.', product: 'Peanut Power', amount: '$14.00', status: 'Pending' },
    { id: '#1237', customer: 'Nikita R.', product: 'Vanilla Crunch', amount: '$13.00', status: 'Delivered' }
  ];

  const statusColors = {
    Delivered: 'bg-green-500/20 text-green-700',
    Shipped: 'bg-blue-500/20 text-blue-700',
    Pending: 'bg-yellow/20 text-yellow-800'
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="bg-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bebas text-white text-3xl tracking-wider">
              FUELBAR ADMIN
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm font-mono">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8">
        <div className="mb-8">
          <h2 className="font-bebas text-purple text-4xl tracking-wide mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">Welcome back! Here's your overview.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-purple">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bebas text-purple text-2xl tracking-wide">
                Recent Orders
              </h3>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-offwhite rounded-xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-purple font-bold">
                        {order.id}
                      </span>
                      <span className="text-sm text-gray-600">{order.customer}</span>
                    </div>
                    <p className="text-xs text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-brown">{order.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statusColors[order.status as keyof typeof statusColors]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bebas text-purple text-2xl tracking-wide">
                Product Inventory
              </h3>
              <Package className="text-purple" size={24} />
            </div>
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-offwhite rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-bold text-purple">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.protein} Protein</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">In Stock</p>
                    <p className="font-bold text-green-600">
                      {Math.floor(Math.random() * 500) + 100}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
