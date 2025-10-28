import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Заполните обязательные поля');
      return;
    }

    toast.success('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    clearCart();
    setFormData({ name: '', phone: '', email: '', address: '', comment: '' });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте печи из каталога</p>
          <Button onClick={() => navigate('/')} size="lg">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            В каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Продолжить покупки
            </Button>
          </div>
          <h1 className="text-4xl font-bold">Корзина ({getTotalItems()})</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const finalPrice = item.sale ? item.price * (1 - item.sale / 100) : item.price;
              
              return (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 
                              className="text-xl font-bold mb-2 cursor-pointer hover:text-primary"
                              onClick={() => navigate(`/stove/${item.id}`)}
                            >
                              {item.name}
                            </h3>
                            {item.sale && (
                              <Badge className="bg-red-500 text-white mb-2">
                                Скидка -{item.sale}%
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={20} className="text-red-500" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="text-xl font-semibold w-12 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>

                          <div className="text-right">
                            {item.sale ? (
                              <>
                                <div className="text-sm text-gray-400 line-through">
                                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                </div>
                                <div className="text-2xl font-bold text-red-600">
                                  {(finalPrice * item.quantity).toLocaleString('ru-RU')} ₽
                                </div>
                              </>
                            ) : (
                              <div className="text-2xl font-bold">
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Оформление заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Город, улица, дом"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comment">Комментарий</Label>
                    <Input
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                      placeholder="Дополнительная информация"
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Товары ({getTotalItems()})</span>
                      <span className="font-semibold">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Доставка</span>
                      <span className="font-semibold">Бесплатно</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Icon name="CheckCircle2" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
