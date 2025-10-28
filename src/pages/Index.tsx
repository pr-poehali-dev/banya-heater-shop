import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Stove {
  id: number;
  name: string;
  type: string;
  price: number;
  power: string;
  volume: string;
  material: string;
  weight: string;
  image: string;
  sale?: number;
  features: string[];
  brand: string;
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
  }
];

export default function Index() {
  const [selectedStoves, setSelectedStoves] = useState<number[]>([]);
  const [filterType, setFilterType] = useState<string>('Все');
  const [filterBrand, setFilterBrand] = useState<string>('Все');

  const toggleStoveSelection = (id: number) => {
    setSelectedStoves(prev => {
      if (prev.includes(id)) {
        return prev.filter(stoveId => stoveId !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredStoves = stoves.filter(s => {
    const matchesType = filterType === 'Все' || s.type === filterType;
    const matchesBrand = filterBrand === 'Все' || s.brand === filterBrand;
    return matchesType && matchesBrand;
  });

  const selectedStovesData = stoves.filter(s => selectedStoves.includes(s.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Flame" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">ПечьМастер</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors font-semibold">Каталог</a>
              <a href="#special" className="hover:text-primary transition-colors font-semibold">Акции</a>
              <a href="#about" className="hover:text-primary transition-colors font-semibold">О компании</a>
              <a href="#contacts" className="hover:text-primary transition-colors font-semibold">Контакты</a>
            </nav>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30">
              <Icon name="Phone" size={18} className="mr-2" />
              8 (800) 555-35-35
            </Button>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary/90 via-secondary/95 to-accent/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Тепло вашего дома начинается здесь
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Банные и отопительные печи премиум качества. Гарантия 5 лет. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8">
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg">
                Консультация
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Каталог печей</h2>
            <p className="text-lg text-muted-foreground">Выберите идеальную печь для вашего дома или бани</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-sm font-semibold text-muted-foreground mr-2 flex items-center">Тип печи:</div>
              {['Все', 'Банная', 'Отопительная'].map(type => (
                <Button
                  key={type}
                  onClick={() => setFilterType(type)}
                  variant={filterType === type ? 'default' : 'outline'}
                  className="font-semibold"
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-sm font-semibold text-muted-foreground mr-2 flex items-center">Бренд:</div>
              {['Все', 'Везувий'].map(brand => (
                <Button
                  key={brand}
                  onClick={() => setFilterBrand(brand)}
                  variant={filterBrand === brand ? 'default' : 'outline'}
                  className="font-semibold"
                >
                  <Icon name="Flame" size={16} className="mr-2" />
                  {brand}
                </Button>
              ))}
            </div>
          </div>

          {selectedStoves.length > 0 && (
            <div className="mb-8 flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="font-semibold gap-2 animate-scale-in">
                    <Icon name="GitCompare" size={20} />
                    Сравнить выбранные ({selectedStoves.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Сравнение моделей</DialogTitle>
                    <DialogDescription>
                      Сравните характеристики выбранных печей
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-2 font-bold">Характеристика</th>
                          {selectedStovesData.map(stove => (
                            <th key={stove.id} className="text-center py-4 px-2">
                              <div className="font-bold text-lg">{stove.name}</div>
                              <div className="text-sm text-muted-foreground">{stove.type}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-2 font-semibold">Цена</td>
                          {selectedStovesData.map(stove => (
                            <td key={stove.id} className="text-center py-3 px-2">
                              <div className="font-bold text-primary text-lg">
                                {stove.sale ? (
                                  <>
                                    <span className="line-through text-muted-foreground text-sm mr-2">
                                      {stove.price.toLocaleString()} ₽
                                    </span>
                                    {Math.round(stove.price * (1 - stove.sale / 100)).toLocaleString()} ₽
                                  </>
                                ) : (
                                  `${stove.price.toLocaleString()} ₽`
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b bg-muted/30">
                          <td className="py-3 px-2 font-semibold">Мощность</td>
                          {selectedStovesData.map(stove => (
                            <td key={stove.id} className="text-center py-3 px-2">{stove.power}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 font-semibold">Объём помещения</td>
                          {selectedStovesData.map(stove => (
                            <td key={stove.id} className="text-center py-3 px-2">{stove.volume}</td>
                          ))}
                        </tr>
                        <tr className="border-b bg-muted/30">
                          <td className="py-3 px-2 font-semibold">Материал</td>
                          {selectedStovesData.map(stove => (
                            <td key={stove.id} className="text-center py-3 px-2">{stove.material}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 font-semibold">Вес</td>
                          {selectedStovesData.map(stove => (
                            <td key={stove.id} className="text-center py-3 px-2">{stove.weight}</td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-semibold">Особенности</td>
                          {selectedStovesData.map(stove => (
                            <td key={stove.id} className="py-3 px-2">
                              <ul className="text-sm space-y-1">
                                {stove.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <Icon name="Check" size={14} className="text-green-600 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStoves.map((stove, idx) => (
              <Card 
                key={stove.id} 
                className="hover-scale overflow-hidden animate-fade-in relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {stove.sale && (
                  <Badge className="absolute top-4 right-4 z-10 bg-primary text-white text-lg px-3 py-1">
                    -{stove.sale}%
                  </Badge>
                )}
                <div className="relative">
                  <img 
                    src={stove.image} 
                    alt={stove.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-secondary">
                      {stove.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30 font-bold">
                      {stove.brand}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl flex items-start justify-between gap-2">
                    <span>{stove.name}</span>
                    <Checkbox
                      checked={selectedStoves.includes(stove.id)}
                      onCheckedChange={() => toggleStoveSelection(stove.id)}
                      disabled={!selectedStoves.includes(stove.id) && selectedStoves.length >= 3}
                      className="mt-1"
                    />
                  </CardTitle>
                  <CardDescription>
                    {selectedStoves.includes(stove.id) && (
                      <span className="text-primary font-semibold">✓ Добавлено к сравнению</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Zap" size={16} className="text-accent" />
                      <span className="font-semibold">Мощность:</span> {stove.power}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Box" size={16} className="text-accent" />
                      <span className="font-semibold">Объём:</span> {stove.volume}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Shield" size={16} className="text-accent" />
                      <span className="font-semibold">Материал:</span> {stove.material}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {stove.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div>
                    {stove.sale ? (
                      <div>
                        <div className="text-sm text-muted-foreground line-through">
                          {stove.price.toLocaleString()} ₽
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {Math.round(stove.price * (1 - stove.sale / 100)).toLocaleString()} ₽
                        </div>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold">
                        {stove.price.toLocaleString()} ₽
                      </div>
                    )}
                  </div>
                  <Button className="font-semibold">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="special" className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Специальные предложения</h2>
            <p className="text-xl text-white/90">Выгодные акции только в этом месяце</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Icon name="Percent" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-xl">Скидка до 15%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">На весь ассортимент банных печей при покупке с установкой</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Icon name="Gift" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-xl">Подарок</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">Комплект инструментов для чистки печи в подарок к каждому заказу</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Icon name="Truck" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-xl">Бесплатная доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">Доставим бесплатно при заказе от 50 000 рублей</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">О компании</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ПечьМастер</strong> — ведущий поставщик банных и отопительных печей в России с 2010 года. 
                  Мы предлагаем только проверенное оборудование от лучших производителей.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Наша команда профессионалов поможет подобрать идеальную печь для вашего дома или бани, 
                  проведёт монтаж и обеспечит гарантийное обслуживание.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">14+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="bg-accent/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-accent mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">гарантия качества</div>
                </div>
                <div className="bg-accent/5 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-accent mb-2">5 лет</div>
                  <div className="text-sm text-muted-foreground">гарантия на печи</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Phone" size={28} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Телефон</div>
                  <div className="text-muted-foreground">8 (800) 555-35-35</div>
                  <div className="text-sm text-muted-foreground">Бесплатно по России</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon name="Mail" size={28} className="text-accent" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <div className="text-muted-foreground">info@pechmaster.ru</div>
                  <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="MapPin" size={28} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Адрес</div>
                  <div className="text-muted-foreground">г. Москва</div>
                  <div className="text-sm text-muted-foreground">ул. Печная, д. 10</div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <Button size="lg" className="font-semibold text-lg">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Заказать консультацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Icon name="Flame" size={28} className="text-primary" />
              <span className="font-bold text-xl">ПечьМастер</span>
            </div>
            <div className="text-center text-sm text-secondary-foreground/80">
              © 2024 ПечьМастер. Все права защищены.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Instagram" size={24} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Facebook" size={24} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Youtube" size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}