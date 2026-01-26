import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showIcon?: boolean;
  iconType?: 'download' | 'file';
  text?: string;
}

const ResumeButton = ({ 
  variant = 'outline', 
  size = 'default',
  className,
  showIcon = true,
  iconType = 'download',
  text = 'View Resume'
}: ResumeButtonProps) => {
  const handleResumeClick = () => {
    window.open('public/Nayan_resume_final.pdf.pdf', '_blank');
  };

  const IconComponent = iconType === 'download' ? Download : FileText;

  return (
    <Button 
      variant={variant}
      size={size}
      className={cn(
        "group transition-all duration-300 hover:scale-105",
        variant === 'outline' && "border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground",
        className
      )}
      onClick={handleResumeClick}
    >
      {showIcon && (
        <IconComponent className="w-4 h-4 mr-2 group-hover:animate-pulse" />
      )}
      {text}
    </Button>
  );
};

export default ResumeButton;
