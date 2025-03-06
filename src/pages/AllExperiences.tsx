
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceCard from '@/components/ExperienceCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Filter } from 'lucide-react';
import { experiences } from '@/lib/data';
import { useInView } from '@/lib/animations';

const AllExperiences = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [sortOrder, setSortOrder] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Reset experiences
    setFilteredExperiences([...experiences]);
  }, []);
  
  // Handle sorting
  useEffect(() => {
    let sorted = [...experiences];
    
    if (sortOrder === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    }
    
    setFilteredExperiences(sorted);
  }, [sortOrder]);
  
  const handleSortChange = (order: 'default' | 'price-low' | 'price-high') => {
    setSortOrder(order);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 md:pt-24">
        {/* Hero Section */}
        <div className="relative h-[30vh] md:h-[40vh] w-full">
          <img 
            src="https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=2674&auto=format&fit=crop" 
            alt="All Experiences"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute top-6 left-6">
            <Link to="/" className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full mb-4">
              <img 
                src="/lovable-uploads/5c4b2b72-9668-4671-9be9-84c7371c459a.png" 
                alt="Slash logo" 
                className="h-8 w-8" 
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-medium mb-2">All Experiences</h1>
            <p className="max-w-2xl text-white/80">
              Browse our complete collection of extraordinary experiences
            </p>
          </div>
        </div>
        
        <div 
          ref={ref}
          className="container max-w-6xl mx-auto px-6 md:px-10 py-12"
        >
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className={cn(
              "transition-all duration-700",
              isInView ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <h2 className="text-2xl font-medium">
                {filteredExperiences.length} Experiences
              </h2>
            </div>
            
            <div className={cn(
              "flex items-center space-x-4 transition-all duration-700 delay-100",
              isInView ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <div className="flex items-center bg-secondary/50 rounded-lg p-1">
                <button 
                  onClick={() => handleSortChange('default')}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    sortOrder === 'default' ? "bg-white text-black" : "text-muted-foreground"
                  )}
                >
                  Featured
                </button>
                <button 
                  onClick={() => handleSortChange('price-low')}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    sortOrder === 'price-low' ? "bg-white text-black" : "text-muted-foreground"
                  )}
                >
                  Price: Low to High
                </button>
                <button 
                  onClick={() => handleSortChange('price-high')}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    sortOrder === 'price-high' ? "bg-white text-black" : "text-muted-foreground"
                  )}
                >
                  Price: High to Low
                </button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Experiences Grid */}
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children",
            isInView ? "opacity-100" : "opacity-0"
          )}>
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllExperiences;
