'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Utensils,
  ArrowUpDown,
  Flame,
  Coffee,
  ChefHat,
  Leaf,
  Beef,
  Clock,
  Sun,
  Moon,
  Zap,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { baseUrl } from '@/config/config';

// Define types for our data
interface MenuItem {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  prepTime: string;
  status: string;
}

interface Category {
  id: string;
  label: string;
  icon: any;
}

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState('');

  // Form state for new item
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    type: '',
    price: '',
    prepTime: '',
    status: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/products`);
      const result = await response.json();

      // API returns an array with a single object
      const data = Array.isArray(result) ? result[0] : result;

      if (data.menuItems && data.categories) {
        setMenuItems(data.menuItems);
        setFilteredItems(data.menuItems);

        const categoryIcons: { [key: string]: any } = {
          Curry: Flame,
          Biryani: ChefHat,
          Breakfast: Coffee,
          Lunch: Sun,
          Dinner: Moon,
          Combos: Zap,
          Chappatis: Utensils,
          Snacks: Utensils,
          Drinks: Coffee,
        };

        const dynamicCategories = data.categories.map((cat: any) => ({
          id: cat.id,
          label: cat.label,
          icon: categoryIcons[cat.label] || Utensils,
        }));

        setCategories(dynamicCategories);
        if (dynamicCategories.length > 0 && !activeTab) {
          setActiveTab(dynamicCategories[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality here
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, menuItems]);

  // Handle adding new menu item
  const handleAddMenuItem = async () => {
    const newMenuItem: MenuItem = {
      id: `${newItem.category.substring(0, 4).toUpperCase()}-${Math.floor(
        Math.random() * 1000
      )
        .toString()
        .padStart(3, '0')}`,
      name: newItem.name,
      category: newItem.category,
      type: newItem.type,
      price: parseFloat(newItem.price),
      prepTime: newItem.prepTime || '15m',
      status: newItem.status || 'Available',
    };

    try {
      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenuItem),
      });

      if (response.ok) {
        const savedItem = await response.json();
        setMenuItems([...menuItems, savedItem]);
        setFilteredItems([...filteredItems, savedItem]);

        // Update categories if new category is added
        const categoryExists = categories.some(
          (cat) => cat.id === newItem.category
        );
        if (!categoryExists) {
          const categoryIcons: { [key: string]: any } = {
            Curry: Flame,
            Biryani: ChefHat,
            Breakfast: Coffee,
            Lunch: Sun,
            Dinner: Moon,
            Combos: Zap,
            Chappatis: Utensils,
            Snacks: Utensils,
            Drinks: Coffee,
          };
          setCategories([
            ...categories,
            {
              id: newItem.category,
              label: newItem.category,
              icon: categoryIcons[newItem.category] || Utensils,
            },
          ]);
        }

        // Reset form and close dialog
        setNewItem({
          name: '',
          category: '',
          type: '',
          price: '',
          prepTime: '',
          status: '',
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  // Handle deleting menu item
  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedItems = menuItems.filter((item) => item.id !== id);
        setMenuItems(updatedItems);
        setFilteredItems(updatedItems);
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  // Handle editing menu item (placeholder for now)
  const handleEditItem = (item: MenuItem) => {
    // Implement edit functionality
    console.log('Edit item:', item);
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'Best Seller': 'bg-primary text-white',
      Hot: 'bg-primary text-white',
      Signature: 'bg-indigo-600 text-white',
      'Chef Pick': 'bg-indigo-600 text-white',
      Available: 'bg-emerald-600 text-white',
      Classic: 'bg-amber-600 text-white',
      'Morning Fav': 'bg-orange-600 text-white',
      Traditional: 'bg-teal-600 text-white',
      'Value Pack': 'bg-blue-600 text-white',
      'Bulk Deal': 'bg-purple-600 text-white',
    };
    return statusColors[status] || 'bg-muted text-muted-foreground';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <ChefHat className="h-16 w-16 animate-bounce mx-auto mb-4 text-primary" />
          <p className="text-lg font-semibold">Loading culinary catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground/90 tracking-tight">
            Culinary Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Engineering the finest Indian dining experience.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-6 gap-2 shadow-xl bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                New Culinary Entry
              </DialogTitle>
              <DialogDescription>
                Define the characteristics of your latest dish.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="dish-name"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                >
                  Dish Name
                </Label>
                <Input
                  id="dish-name"
                  placeholder="e.g. Royal Shahi Paneer"
                  className="bg-muted/50 border-none h-12 rounded-xl focus:ring-primary"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="dish-category"
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                  >
                    Section
                  </Label>
                  <Input
                    id="dish-category"
                    placeholder="Curry"
                    className="bg-muted/50 border-none h-12 rounded-xl"
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="dish-type"
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                  >
                    Dietary
                  </Label>
                  <Input
                    id="dish-type"
                    placeholder="Veg"
                    className="bg-muted/50 border-none h-12 rounded-xl"
                    value={newItem.type}
                    onChange={(e) =>
                      setNewItem({ ...newItem, type: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="dish-price"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                >
                  Price ($)
                </Label>
                <Input
                  id="dish-price"
                  type="number"
                  placeholder="14.99"
                  className="bg-muted/50 border-none h-12 rounded-xl"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="dish-prep-time"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                >
                  Prep Time
                </Label>
                <Input
                  id="dish-prep-time"
                  placeholder="15m"
                  className="bg-muted/50 border-none h-12 rounded-xl"
                  value={newItem.prepTime}
                  onChange={(e) =>
                    setNewItem({ ...newItem, prepTime: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="dish-status"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                >
                  Status
                </Label>
                <Input
                  id="dish-status"
                  placeholder="Available"
                  className="bg-muted/50 border-none h-12 rounded-xl"
                  value={newItem.status}
                  onChange={(e) =>
                    setNewItem({ ...newItem, status: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddMenuItem}
                className="w-full h-12 bg-primary font-bold text-lg rounded-xl"
              >
                Commit to Kitchen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass-card p-5 rounded-3xl shadow-sm">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search dishes, ingredients..."
            className="pl-12 bg-muted/40 border-none h-11 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-11 px-4 rounded-2xl border-primary/10 hover:bg-primary/5"
          >
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button
            variant="outline"
            className="h-11 px-4 rounded-2xl border-primary/10 hover:bg-primary/5"
          >
            P&L Export
          </Button>
        </div>
      </div>

      {categories.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/30 p-1.5 mb-8 flex-wrap h-auto gap-1 rounded-2xl overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-6 py-2.5 gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary transition-all"
              >
                <cat.icon className="h-4 w-4" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  {cat.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent
              key={cat.id}
              value={cat.id}
              className="animate-in fade-in-50 duration-500"
            >
              <div className="rounded-3xl border shadow-sm bg-card overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40 h-14">
                    <TableRow>
                      <TableHead className="w-[80px] px-6">ID</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">
                        Dish Details
                      </TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">
                        Classification
                      </TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">
                        Unit Price
                      </TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">
                        Prep Efficiency
                      </TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">
                        Kitchen Status
                      </TableHead>
                      <TableHead className="text-right px-6"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems
                      .filter((item) => item.category === cat.id)
                      .map((item) => (
                        <TableRow
                          key={item.id}
                          className="h-20 hover:bg-primary/[0.02] transition-colors border-b-border/40"
                        >
                          <TableCell className="px-6">
                            <span className="text-[10px] font-black font-code text-primary bg-primary/10 px-2 py-1 rounded-md">
                              {item.id.split('-')[1] || item.id.substring(0, 6)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-black text-base text-foreground/80">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                {item.id}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`gap-1.5 border-none shadow-sm px-3 py-1 text-[10px] font-black uppercase ${
                                item.type === 'Veg' ||
                                item.type === 'Vegetarian'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {item.type === 'Veg' ||
                              item.type === 'Vegetarian' ? (
                                <Leaf className="h-3 w-3" />
                              ) : (
                                <Beef className="h-3 w-3" />
                              )}
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-black text-lg text-primary">
                            ${item.price.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-sm font-bold text-muted-foreground">
                                {item.prepTime}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`shadow-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${getStatusColor(item.status)}`}
                            >
                              {(item.status === 'Best Seller' ||
                                item.status === 'Hot') && (
                                <Star className="h-2.5 w-2.5 fill-current mr-1" />
                              )}
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right px-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 rounded-xl hover:bg-muted"
                                >
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-2xl p-2 border-none shadow-2xl"
                              >
                                <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest opacity-50">
                                  Operational Controls
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="gap-3 p-3 rounded-xl cursor-pointer"
                                  onClick={() => handleEditItem(item)}
                                >
                                  <Edit className="h-4 w-4" /> Modify Recipe
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer">
                                  <Flame className="h-4 w-4" /> Station Config
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border/50" />
                                <DropdownMenuItem
                                  className="gap-3 p-3 rounded-xl cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" /> Mark
                                  Out-of-Stock
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredItems.filter((item) => item.category === cat.id)
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center opacity-30 grayscale">
                            <ChefHat className="h-16 w-16 mb-4" />
                            <p className="text-sm font-black uppercase tracking-widest">
                              No culinary data in {cat.label}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
