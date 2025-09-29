import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Image as FabricImage, Text as FabricText } from 'fabric';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, Download, X } from 'lucide-react';

interface ImageEditorProps {
  imageFile: File;
  onSave: (imageBlob: Blob) => void;
  onClose: () => void;
}

const ImageEditor = ({ imageFile, onSave, onClose }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom' | 'left' | 'right'>('center');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#ffffff');

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: '#ffffff',
    });

    // Load the image
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        FabricImage.fromURL(e.target?.result as string, {
          crossOrigin: 'anonymous'
        }).then((img) => {
          // Scale image to fit canvas while maintaining aspect ratio
          const scale = Math.min(
            canvas.width! / img.width!,
            canvas.height! / img.height!
          );
          
          img.scale(scale);
          img.set({
            left: (canvas.width! - img.width! * scale) / 2,
            top: (canvas.height! - img.height! * scale) / 2,
            selectable: false,
            evented: false
          });
          
          canvas.add(img);
          canvas.renderAll();
        });
      };
      imgElement.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [imageFile]);

  const addText = () => {
    if (!fabricCanvas || !text.trim()) return;

    const textObj = new FabricText(text, {
      fontSize: fontSize,
      fill: textColor,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      stroke: textColor === '#ffffff' ? '#000000' : '#ffffff',
      strokeWidth: 1,
    });

    // Position text based on selection
    let left = 0;
    let top = 0;

    switch (textPosition) {
      case 'top':
        left = fabricCanvas.width! / 2 - textObj.width! / 2;
        top = 30;
        break;
      case 'center':
        left = fabricCanvas.width! / 2 - textObj.width! / 2;
        top = fabricCanvas.height! / 2 - textObj.height! / 2;
        break;
      case 'bottom':
        left = fabricCanvas.width! / 2 - textObj.width! / 2;
        top = fabricCanvas.height! - textObj.height! - 30;
        break;
      case 'left':
        left = 30;
        top = fabricCanvas.height! / 2 - textObj.height! / 2;
        break;
      case 'right':
        left = fabricCanvas.width! - textObj.width! - 30;
        top = fabricCanvas.height! / 2 - textObj.height! / 2;
        break;
    }

    textObj.set({ left, top });
    fabricCanvas.add(textObj);
    fabricCanvas.setActiveObject(textObj);
    fabricCanvas.renderAll();
    setText('');
  };

  const handleSave = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL();
    fetch(dataURL)
      .then(res => res.blob())
      .then(blob => onSave(blob));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Editor de Imagem</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <canvas ref={canvasRef} className="border border-border rounded-lg max-w-full" />
            </div>
            <div className="w-80 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Texto</Label>
                <Input
                  id="text"
                  placeholder="Digite o texto..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Posição</Label>
                <Select value={textPosition} onValueChange={(value: any) => setTextPosition(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Superior</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="bottom">Inferior</SelectItem>
                    <SelectItem value="left">Esquerda</SelectItem>
                    <SelectItem value="right">Direita</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Tamanho</Label>
                  <Input
                    id="fontSize"
                    type="number"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textColor">Cor</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={addText} className="w-full" disabled={!text.trim()}>
                <Type className="h-4 w-4 mr-2" />
                Adicionar Texto
              </Button>

              <div className="border-t pt-4">
                <Button onClick={handleSave} className="w-full btn-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Salvar Imagem
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageEditor;