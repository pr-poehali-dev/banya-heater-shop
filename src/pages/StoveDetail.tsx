import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Stove {
  id: number;
  name: string;
  type: string;
  brand: string;
  price: number;
  power: string;
  volume: string;
  material: string;
  weight: string;
  image: string;
  sale?: number;
  features: string[];
}

const stoves: Stove[] = [
  {
    id: 1,
    name: 'Везувий Легенда Стандарт 16',
    type: 'Банная',
    brand: 'Везувий',
    price: 52000,
    power: '16 кВт',
    volume: '8-16 м³',
    material: 'Сталь 8мм',
    weight: '85 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    sale: 15,
    features: ['Увеличенная каменка', 'Парогенератор', 'Жаростойкое покрытие']
  },
  {
    id: 2,
    name: 'Везувий Скиф Стандарт 22',
    type: 'Банная',
    brand: 'Везувий',
    price: 48000,
    power: '22 кВт',
    volume: '12-22 м³',
    material: 'Сталь 10мм',
    weight: '95 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Мощная каменка', 'Быстрый прогрев', 'Длительное горение']
  },
  {
    id: 3,
    name: 'Везувий Русичъ Премиум 18',
    type: 'Банная',
    brand: 'Везувий',
    price: 62000,
    power: '18 кВт',
    volume: '10-18 м³',
    material: 'Сталь 12мм',
    weight: '108 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    sale: 10,
    features: ['Премиум качество', 'Усиленная конструкция', 'Panoramic стекло']
  },
  {
    id: 4,
    name: 'Везувий Оптимум 14',
    type: 'Банная',
    brand: 'Везувий',
    price: 38000,
    power: '14 кВт',
    volume: '8-14 м³',
    material: 'Сталь 6мм',
    weight: '72 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Компактная', 'Экономичная', 'Надёжная']
  },
  {
    id: 5,
    name: 'Везувий Ураган 24',
    type: 'Банная',
    brand: 'Везувий',
    price: 58000,
    power: '24 кВт',
    volume: '14-24 м³',
    material: 'Сталь 10мм',
    weight: '112 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    sale: 12,
    features: ['Максимальная мощность', 'Большой объём', 'Профессиональная']
  },
  {
    id: 6,
    name: 'Везувий Вертикаль 20',
    type: 'Отопительная',
    brand: 'Везувий',
    price: 45000,
    power: '20 кВт',
    volume: '15-25 м³',
    material: 'Сталь 8мм',
    weight: '88 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Вертикальная загрузка', 'Высокий КПД', 'Экономия дров']
  },
  {
    id: 7,
    name: 'Везувий Эко 12',
    type: 'Отопительная',
    brand: 'Везувий',
    price: 35000,
    power: '12 кВт',
    volume: '10-15 м³',
    material: 'Сталь 6мм',
    weight: '68 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Экологичная', 'Компактная', 'Современный дизайн']
  },
  {
    id: 8,
    name: 'Везувий Премиум Термо 28',
    type: 'Отопительная',
    brand: 'Везувий',
    price: 72000,
    power: '28 кВт',
    volume: '20-35 м³',
    material: 'Чугун + Сталь',
    weight: '145 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Премиум класс', 'Комбинированная', 'Максимальная эффективность']
  },
  {
    id: 9,
    name: 'ЕРМАК Сибирь 18',
    type: 'Банная',
    brand: 'ЕРМАК',
    price: 44000,
    power: '18 кВт',
    volume: '10-18 м³',
    material: 'Сталь 8мм',
    weight: '82 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    sale: 8,
    features: ['Сибирское качество', 'Надёжная', 'Проверенная временем']
  },
  {
    id: 10,
    name: 'ЕРМАК Уралочка 15',
    type: 'Отопительная',
    brand: 'ЕРМАК',
    price: 36000,
    power: '15 кВт',
    volume: '12-20 м³',
    material: 'Чугун',
    weight: '95 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Чугунная топка', 'Долговечность', 'Высокая теплоотдача']
  },
  {
    id: 11,
    name: 'FIREWAY Vesta 20',
    type: 'Банная',
    brand: 'FIREWAY',
    price: 55000,
    power: '20 кВт',
    volume: '12-20 м³',
    material: 'Сталь 10мм',
    weight: '98 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    sale: 10,
    features: ['Европейский дизайн', 'Инновационная', 'Энергоэффективная']
  },
  {
    id: 12,
    name: 'FIREWAY Nord 16',
    type: 'Отопительная',
    brand: 'FIREWAY',
    price: 48000,
    power: '16 кВт',
    volume: '15-22 м³',
    material: 'Сталь 8мм',
    weight: '86 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Скандинавский стиль', 'Чистое горение', 'Современная']
  },
  {
    id: 13,
    name: 'ТЕХНОЛИТ Магма 22',
    type: 'Банная',
    brand: 'ТЕХНОЛИТ',
    price: 49000,
    power: '22 кВт',
    volume: '12-22 м³',
    material: 'Сталь 9мм',
    weight: '92 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Усиленная камера', 'Быстрый нагрев', 'Термостойкая']
  },
  {
    id: 14,
    name: 'ТЕХНОЛИТ Вулкан 18',
    type: 'Отопительная',
    brand: 'ТЕХНОЛИТ',
    price: 42000,
    power: '18 кВт',
    volume: '14-24 м³',
    material: 'Сталь 8мм',
    weight: '88 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    sale: 7,
    features: ['Мощная конвекция', 'Равномерный нагрев', 'Экономичная']
  },
  {
    id: 15,
    name: 'ВАРВАРА Русский Пар 20',
    type: 'Банная',
    brand: 'ВАРВАРА',
    price: 51000,
    power: '20 кВт',
    volume: '10-20 м³',
    material: 'Сталь 10мм',
    weight: '96 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Мягкий пар', 'Традиционная баня', 'Защита от перегрева']
  },
  {
    id: 16,
    name: 'ВАРВАРА Терем 14',
    type: 'Отопительная',
    brand: 'ВАРВАРА',
    price: 39000,
    power: '14 кВт',
    volume: '12-18 м³',
    material: 'Сталь 7мм',
    weight: '76 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Русский стиль', 'Компактная', 'Уютное тепло']
  },
  {
    id: 17,
    name: 'PROMETALL Fire King 24',
    type: 'Банная',
    brand: 'PROMETALL',
    price: 64000,
    power: '24 кВт',
    volume: '14-24 м³',
    material: 'Сталь 12мм',
    weight: '115 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    sale: 12,
    features: ['Премиум сталь', 'Усиленная конструкция', 'Долговечность']
  },
  {
    id: 18,
    name: 'PROMETALL Home 16',
    type: 'Отопительная',
    brand: 'PROMETALL',
    price: 47000,
    power: '16 кВт',
    volume: '14-20 м³',
    material: 'Сталь 9мм',
    weight: '89 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Качественная сборка', 'Стабильный нагрев', 'Надёжная']
  },
  {
    id: 19,
    name: 'ТЕПЛОДАР Русь 18',
    type: 'Банная',
    brand: 'ТЕПЛОДАР',
    price: 46000,
    power: '18 кВт',
    volume: '10-18 м³',
    material: 'Сталь 8мм',
    weight: '84 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Популярная модель', 'Быстрый прогрев', 'Оптимальная цена']
  },
  {
    id: 20,
    name: 'ТЕПЛОДАР Печурка 12',
    type: 'Отопительная',
    brand: 'ТЕПЛОДАР',
    price: 34000,
    power: '12 кВт',
    volume: '10-16 м³',
    material: 'Сталь 6мм',
    weight: '68 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    sale: 5,
    features: ['Бюджетная', 'Компактная', 'Проверенная']
  },
  {
    id: 21,
    name: 'ASTON Premium 22',
    type: 'Банная',
    brand: 'ASTON',
    price: 68000,
    power: '22 кВт',
    volume: '12-22 м³',
    material: 'Сталь 11мм',
    weight: '105 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Премиум сегмент', 'Дизайнерская', 'Инновационная']
  },
  {
    id: 22,
    name: 'ASTON Comfort 18',
    type: 'Отопительная',
    brand: 'ASTON',
    price: 54000,
    power: '18 кВт',
    volume: '16-24 м³',
    material: 'Сталь 9мм',
    weight: '92 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    sale: 8,
    features: ['Комфортная', 'Эффективная', 'Стильная']
  },
  {
    id: 23,
    name: 'EVEREST Summit 26',
    type: 'Банная',
    brand: 'EVEREST',
    price: 70000,
    power: '26 кВт',
    volume: '16-26 м³',
    material: 'Сталь 12мм',
    weight: '120 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    sale: 15,
    features: ['Максимальная мощность', 'Профессиональная', 'Топ качество']
  },
  {
    id: 24,
    name: 'EVEREST Peak 20',
    type: 'Отопительная',
    brand: 'EVEREST',
    price: 58000,
    power: '20 кВт',
    volume: '18-28 м³',
    material: 'Сталь 10мм',
    weight: '98 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    features: ['Высокая эффективность', 'Прочная', 'Долговечная']
  },
  {
    id: 25,
    name: 'ECOKAMIN Eco Plus 16',
    type: 'Банная',
    brand: 'ECOKAMIN',
    price: 43000,
    power: '16 кВт',
    volume: '8-16 м³',
    material: 'Сталь 8мм',
    weight: '78 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/089b8914-8cf0-4a69-b4e5-20febcf52f4e.jpg',
    features: ['Экологичная', 'Низкий выброс', 'Чистое горение']
  },
  {
    id: 26,
    name: 'ECOKAMIN Green Heat 14',
    type: 'Отопительная',
    brand: 'ECOKAMIN',
    price: 38000,
    power: '14 кВт',
    volume: '12-18 м³',
    material: 'Сталь 7мм',
    weight: '72 кг',
    image: 'https://cdn.poehali.dev/projects/f9ea886c-efa7-412a-82fd-cb4d271dfc47/files/d2da4a26-1d03-4aec-8d0f-db51930d96c5.jpg',
    sale: 6,
    features: ['Эко-технология', 'Энергосберегающая', 'Современная']
  }
];

export default function StoveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const stove = stoves.find(s => s.id === Number(id));

  const handleAddToCart = () => {
    if (stove) {
      const finalPrice = stove.sale ? stove.price * (1 - stove.sale / 100) : stove.price;
      addToCart({
        id: stove.id,
        name: stove.name,
        price: stove.price,
        image: stove.image,
        sale: stove.sale
      });
      toast.success('Товар добавлен в корзину!');
    }
  };

  if (!stove) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Печь не найдена</h1>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const finalPrice = stove.sale ? stove.price * (1 - stove.sale / 100) : stove.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          К каталогу
        </Button>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <img 
                  src={stove.image} 
                  alt={stove.name}
                  className="w-full h-full object-cover"
                />
                {stove.sale && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-4 py-2">
                    -{stove.sale}%
                  </Badge>
                )}
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-2">{stove.type}</Badge>
                  <Badge variant="outline" className="ml-2">{stove.brand}</Badge>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-6">{stove.name}</h1>

                <div className="mb-8">
                  <div className="flex items-baseline gap-4 mb-2">
                    {stove.sale ? (
                      <>
                        <span className="text-5xl font-bold text-red-600">
                          {finalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="text-2xl text-gray-400 line-through">
                          {stove.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </>
                    ) : (
                      <span className="text-5xl font-bold text-gray-900">
                        {stove.price.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h2 className="text-2xl font-semibold">Характеристики</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Zap" size={20} className="text-orange-600" />
                        <span className="text-sm text-gray-600">Мощность</span>
                      </div>
                      <p className="font-semibold text-lg">{stove.power}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Box" size={20} className="text-orange-600" />
                        <span className="text-sm text-gray-600">Объём</span>
                      </div>
                      <p className="font-semibold text-lg">{stove.volume}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Layers" size={20} className="text-orange-600" />
                        <span className="text-sm text-gray-600">Материал</span>
                      </div>
                      <p className="font-semibold text-lg">{stove.material}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Weight" size={20} className="text-orange-600" />
                        <span className="text-sm text-gray-600">Вес</span>
                      </div>
                      <p className="font-semibold text-lg">{stove.weight}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Особенности</h2>
                  <div className="space-y-2">
                    {stove.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-green-600" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    В корзину
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/cart')}>
                    <Icon name="ShoppingBag" size={20} className="mr-2" />
                    Оформить
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}