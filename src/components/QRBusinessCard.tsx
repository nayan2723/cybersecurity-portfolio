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
            {contactInfo.phone && (
              <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
            )}
            <div className="flex gap-3 justify-center pt-2">
              {contactInfo.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
              {contactInfo.github && (
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
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
