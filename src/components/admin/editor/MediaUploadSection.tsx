import React from 'react';
import { ClientInvitationData, TemplateId } from '../../../types/clientInvitation';
import { TEMPLATE_REGISTRY } from '../../../admin/templateRegistry';
import { MediaSlotUploader } from '../MediaSlotUploader';
import { ImageIcon } from 'lucide-react';

interface MediaUploadSectionProps {
  formData: ClientInvitationData;
  selectedTemplateId: TemplateId;
  onMediaSlotChange: (slotKey: string, newValue: string | string[]) => void;
}

export const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  formData,
  selectedTemplateId,
  onMediaSlotChange
}) => {
  const activeTemplateDef = TEMPLATE_REGISTRY[selectedTemplateId] || TEMPLATE_REGISTRY['ruang-rasa'];

  return (
    <div className="max-w-3xl text-left space-y-6">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#C5A880]" />
          <span>Slot Media &amp; Foto: {activeTemplateDef.name}</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Unggah foto untuk slot media khusus template ini. Untuk galeri dan klise film, Anda bebas menambahkan foto sebanyak yang diinginkan.
        </p>
      </div>

      <div className="space-y-4">
        {activeTemplateDef.mediaSlots.map((slot) => (
          <MediaSlotUploader
            key={slot.key}
            slot={slot}
            value={(formData.mediaSlots as any)[slot.key]}
            onChange={(newVal) => onMediaSlotChange(slot.key, newVal)}
          />
        ))}
      </div>
    </div>
  );
};
