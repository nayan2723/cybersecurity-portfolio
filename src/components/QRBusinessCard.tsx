import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  website: string;
  linkedin?: string;
  github?: string;
}

const QRBusinessCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo: ContactInfo = {
    name: "Nayan Kshitij",
    title: "Cybersecurity Enthusiast & Full-Stack Developer",
    email: "nayankshitij128@gmail.com",
    phone: "+91-9100606434",
    website: "https://nayan-dev.lovable.app",
    linkedin: "https://www.linkedin.com/in/nayan-kshitij",
    github: "https://github.com/nayankumar-cybersec",
  };

  // Generate vCard format
  const generateVCard = (): string => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contactInfo.name}`,
      `TITLE:${contactInfo.title}`,
      `EMAIL:${contactInfo.email}`,
      contactInfo.phone ? `TEL:${contactInfo.phone}` : '',
      `URL:${contactInfo.website}`,
      contactInfo.linkedin ? `X-SOCIALPROFILE;type=linkedin:${contactInfo.linkedin}` : '',
      contactInfo.github ? `X-SOCIALPROFILE;type=github:${contactInfo.github}` : '',
      'END:VCARD'
    ].filter(line => line !== '').join('\n');
    
    return vcard;
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 1024;
      
      // White background
      ctx!.fillStyle = 'white';
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR code
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${contactInfo.name.replace(/\s+/g, '_')}_QR_BusinessCard.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('QR Code downloaded successfully!');
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${contactInfo.name} - Digital Business Card`,
          text: `Scan this QR code to save my contact information!`,
          url: contactInfo.website,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      // Fallback: copy website URL to clipboard
      navigator.clipboard.writeText(contactInfo.website);
      toast.success('Website URL copied to clipboard!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="group relative overflow-hidden border-primary/30 hover:border-primary"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <QrCode className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
          Digital Business Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Digital Business Card
          </DialogTitle>
          <DialogDescription>
            Scan this QR code to instantly save my contact information to your phone
          </DialogDescription>
        </DialogHeader>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-6 py-6"
        >
          <Card className="p-6 bg-white dark:bg-gray-900 border-2 border-primary/20 shadow-lg">
            <QRCodeSVG
              id="qr-code-svg"
              value={generateVCard()}
              size={256}
              level="H"
              includeMargin={true}
              className="w-full h-full"
            />
          </Card>

          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{contactInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{contactInfo.title}</p>
            <p className="text-sm text-primary">{contactInfo.email}</p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              onClick={downloadQRCode}
              className="flex-1 group"
              variant="default"
            >
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Download
            </Button>
            <Button
              onClick={shareQRCode}
              className="flex-1 group"
              variant="outline"
            >
              <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Share
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Works with any smartphone camera or QR code reader
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default QRBusinessCard;
