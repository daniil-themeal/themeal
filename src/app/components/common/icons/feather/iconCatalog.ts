import type { ComponentType } from 'react';

import type { IconProps } from '../iconProps';
import type { IconSize } from '../iconSize';

import { ActivityIcon } from './ActivityIcon';
import { AirplayIcon } from './AirplayIcon';
import { AlertCircleIcon } from './AlertCircleIcon';
import { AlertOctagonIcon } from './AlertOctagonIcon';
import { AlertTriangleIcon } from './AlertTriangleIcon';
import { AlignCenterIcon } from './AlignCenterIcon';
import { AlignJustifyIcon } from './AlignJustifyIcon';
import { AlignLeftIcon } from './AlignLeftIcon';
import { AlignRightIcon } from './AlignRightIcon';
import { AnchorIcon } from './AnchorIcon';
import { ApertureIcon } from './ApertureIcon';
import { ArchiveIcon } from './ArchiveIcon';
import { ArrowDownCircleIcon } from './ArrowDownCircleIcon';
import { ArrowDownLeftIcon } from './ArrowDownLeftIcon';
import { ArrowDownRightIcon } from './ArrowDownRightIcon';
import { ArrowDownIcon } from './ArrowDownIcon';
import { ArrowLeftCircleIcon } from './ArrowLeftCircleIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { ArrowRightCircleIcon } from './ArrowRightCircleIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowUpCircleIcon } from './ArrowUpCircleIcon';
import { ArrowUpLeftIcon } from './ArrowUpLeftIcon';
import { ArrowUpRightIcon } from './ArrowUpRightIcon';
import { ArrowUpIcon } from './ArrowUpIcon';
import { AtSignIcon } from './AtSignIcon';
import { AwardIcon } from './AwardIcon';
import { BarChart2Icon } from './BarChart2Icon';
import { BarChartIcon } from './BarChartIcon';
import { BatteryChargingIcon } from './BatteryChargingIcon';
import { BatteryIcon } from './BatteryIcon';
import { BellOffIcon } from './BellOffIcon';
import { BellIcon } from './BellIcon';
import { BluetoothIcon } from './BluetoothIcon';
import { BoldIcon } from './BoldIcon';
import { BookOpenIcon } from './BookOpenIcon';
import { BookIcon } from './BookIcon';
import { BookmarkIcon } from './BookmarkIcon';
import { BoxIcon } from './BoxIcon';
import { BriefcaseIcon } from './BriefcaseIcon';
import { CalendarIcon } from './CalendarIcon';
import { CameraOffIcon } from './CameraOffIcon';
import { CameraIcon } from './CameraIcon';
import { CastIcon } from './CastIcon';
import { CheckCircleIcon } from './CheckCircleIcon';
import { CheckSquareIcon } from './CheckSquareIcon';
import { CheckIcon } from './CheckIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronLeftIcon } from './ChevronLeftIcon';
import { ChevronRightIcon } from './ChevronRightIcon';
import { ChevronUpIcon } from './ChevronUpIcon';
import { ChevronsDownIcon } from './ChevronsDownIcon';
import { ChevronsLeftIcon } from './ChevronsLeftIcon';
import { ChevronsRightIcon } from './ChevronsRightIcon';
import { ChevronsUpIcon } from './ChevronsUpIcon';
import { ChromeIcon } from './ChromeIcon';
import { CircleIcon } from './CircleIcon';
import { ClipboardIcon } from './ClipboardIcon';
import { ClockIcon } from './ClockIcon';
import { CloudDrizzleIcon } from './CloudDrizzleIcon';
import { CloudLightningIcon } from './CloudLightningIcon';
import { CloudOffIcon } from './CloudOffIcon';
import { CloudRainIcon } from './CloudRainIcon';
import { CloudSnowIcon } from './CloudSnowIcon';
import { CloudIcon } from './CloudIcon';
import { CodeIcon } from './CodeIcon';
import { CodepenIcon } from './CodepenIcon';
import { CodesandboxIcon } from './CodesandboxIcon';
import { CoffeeIcon } from './CoffeeIcon';
import { ColumnsIcon } from './ColumnsIcon';
import { CommandIcon } from './CommandIcon';
import { CompassIcon } from './CompassIcon';
import { CopyIcon } from './CopyIcon';
import { CornerDownLeftIcon } from './CornerDownLeftIcon';
import { CornerDownRightIcon } from './CornerDownRightIcon';
import { CornerLeftDownIcon } from './CornerLeftDownIcon';
import { CornerLeftUpIcon } from './CornerLeftUpIcon';
import { CornerRightDownIcon } from './CornerRightDownIcon';
import { CornerRightUpIcon } from './CornerRightUpIcon';
import { CornerUpLeftIcon } from './CornerUpLeftIcon';
import { CornerUpRightIcon } from './CornerUpRightIcon';
import { CpuIcon } from './CpuIcon';
import { CreditCardIcon } from './CreditCardIcon';
import { CropIcon } from './CropIcon';
import { CrosshairIcon } from './CrosshairIcon';
import { DatabaseIcon } from './DatabaseIcon';
import { DeleteIcon } from './DeleteIcon';
import { DiscIcon } from './DiscIcon';
import { DivideCircleIcon } from './DivideCircleIcon';
import { DivideSquareIcon } from './DivideSquareIcon';
import { DivideIcon } from './DivideIcon';
import { DollarSignIcon } from './DollarSignIcon';
import { DownloadCloudIcon } from './DownloadCloudIcon';
import { DownloadIcon } from './DownloadIcon';
import { DribbbleIcon } from './DribbbleIcon';
import { DropletIcon } from './DropletIcon';
import { Edit2Icon } from './Edit2Icon';
import { Edit3Icon } from './Edit3Icon';
import { EditIcon } from './EditIcon';
import { ExternalLinkIcon } from './ExternalLinkIcon';
import { EyeOffIcon } from './EyeOffIcon';
import { EyeIcon } from './EyeIcon';
import { FacebookIcon } from './FacebookIcon';
import { FastForwardIcon } from './FastForwardIcon';
import { FeatherIcon } from './FeatherIcon';
import { FigmaIcon } from './FigmaIcon';
import { FileMinusIcon } from './FileMinusIcon';
import { FilePlusIcon } from './FilePlusIcon';
import { FileTextIcon } from './FileTextIcon';
import { FileIcon } from './FileIcon';
import { FilmIcon } from './FilmIcon';
import { FilterIcon } from './FilterIcon';
import { FlagIcon } from './FlagIcon';
import { FolderMinusIcon } from './FolderMinusIcon';
import { FolderPlusIcon } from './FolderPlusIcon';
import { FolderIcon } from './FolderIcon';
import { FramerIcon } from './FramerIcon';
import { FrownIcon } from './FrownIcon';
import { GiftIcon } from './GiftIcon';
import { GitBranchIcon } from './GitBranchIcon';
import { GitCommitIcon } from './GitCommitIcon';
import { GitMergeIcon } from './GitMergeIcon';
import { GitPullRequestIcon } from './GitPullRequestIcon';
import { GithubIcon } from './GithubIcon';
import { GitlabIcon } from './GitlabIcon';
import { GlobeIcon } from './GlobeIcon';
import { GridIcon } from './GridIcon';
import { HardDriveIcon } from './HardDriveIcon';
import { HashIcon } from './HashIcon';
import { HeadphonesIcon } from './HeadphonesIcon';
import { HeartIcon } from './HeartIcon';
import { HelpCircleIcon } from './HelpCircleIcon';
import { HexagonIcon } from './HexagonIcon';
import { HomeIcon } from './HomeIcon';
import { ImageIcon } from './ImageIcon';
import { InboxIcon } from './InboxIcon';
import { InfoIcon } from './InfoIcon';
import { InstagramIcon } from './InstagramIcon';
import { ItalicIcon } from './ItalicIcon';
import { KeyIcon } from './KeyIcon';
import { LayersIcon } from './LayersIcon';
import { LayoutIcon } from './LayoutIcon';
import { LifeBuoyIcon } from './LifeBuoyIcon';
import { Link2Icon } from './Link2Icon';
import { LinkIcon } from './LinkIcon';
import { LinkedinIcon } from './LinkedinIcon';
import { ListIcon } from './ListIcon';
import { LoaderIcon } from './LoaderIcon';
import { LockIcon } from './LockIcon';
import { LogInIcon } from './LogInIcon';
import { LogOutIcon } from './LogOutIcon';
import { MailIcon } from './MailIcon';
import { MapPinIcon } from './MapPinIcon';
import { MapIcon } from './MapIcon';
import { Maximize2Icon } from './Maximize2Icon';
import { MaximizeIcon } from './MaximizeIcon';
import { MehIcon } from './MehIcon';
import { MenuIcon } from './MenuIcon';
import { MessageCircleIcon } from './MessageCircleIcon';
import { MessageSquareIcon } from './MessageSquareIcon';
import { MicOffIcon } from './MicOffIcon';
import { MicIcon } from './MicIcon';
import { Minimize2Icon } from './Minimize2Icon';
import { MinimizeIcon } from './MinimizeIcon';
import { MinusCircleIcon } from './MinusCircleIcon';
import { MinusSquareIcon } from './MinusSquareIcon';
import { MinusIcon } from './MinusIcon';
import { MonitorIcon } from './MonitorIcon';
import { MoonIcon } from './MoonIcon';
import { MoreHorizontalIcon } from './MoreHorizontalIcon';
import { MoreVerticalIcon } from './MoreVerticalIcon';
import { MousePointerIcon } from './MousePointerIcon';
import { MoveIcon } from './MoveIcon';
import { MusicIcon } from './MusicIcon';
import { Navigation2Icon } from './Navigation2Icon';
import { NavigationIcon } from './NavigationIcon';
import { OctagonIcon } from './OctagonIcon';
import { PackageIcon } from './PackageIcon';
import { PaperclipIcon } from './PaperclipIcon';
import { PauseCircleIcon } from './PauseCircleIcon';
import { PauseIcon } from './PauseIcon';
import { PenToolIcon } from './PenToolIcon';
import { PercentIcon } from './PercentIcon';
import { PhoneCallIcon } from './PhoneCallIcon';
import { PhoneForwardedIcon } from './PhoneForwardedIcon';
import { PhoneIncomingIcon } from './PhoneIncomingIcon';
import { PhoneMissedIcon } from './PhoneMissedIcon';
import { PhoneOffIcon } from './PhoneOffIcon';
import { PhoneOutgoingIcon } from './PhoneOutgoingIcon';
import { PhoneIcon } from './PhoneIcon';
import { PieChartIcon } from './PieChartIcon';
import { PlayCircleIcon } from './PlayCircleIcon';
import { PlayIcon } from './PlayIcon';
import { PlusCircleIcon } from './PlusCircleIcon';
import { PlusSquareIcon } from './PlusSquareIcon';
import { PlusIcon } from './PlusIcon';
import { PocketIcon } from './PocketIcon';
import { PowerIcon } from './PowerIcon';
import { PrinterIcon } from './PrinterIcon';
import { RadioIcon } from './RadioIcon';
import { RefreshCcwIcon } from './RefreshCcwIcon';
import { RefreshCwIcon } from './RefreshCwIcon';
import { RepeatIcon } from './RepeatIcon';
import { RewindIcon } from './RewindIcon';
import { RotateCcwIcon } from './RotateCcwIcon';
import { RotateCwIcon } from './RotateCwIcon';
import { RssIcon } from './RssIcon';
import { SaveIcon } from './SaveIcon';
import { ScissorsIcon } from './ScissorsIcon';
import { SearchIcon } from './SearchIcon';
import { SendIcon } from './SendIcon';
import { ServerIcon } from './ServerIcon';
import { SettingsIcon } from './SettingsIcon';
import { Share2Icon } from './Share2Icon';
import { ShareIcon } from './ShareIcon';
import { ShieldOffIcon } from './ShieldOffIcon';
import { ShieldIcon } from './ShieldIcon';
import { ShoppingBagIcon } from './ShoppingBagIcon';
import { ShoppingCartIcon } from './ShoppingCartIcon';
import { ShuffleIcon } from './ShuffleIcon';
import { SidebarIcon } from './SidebarIcon';
import { SkipBackIcon } from './SkipBackIcon';
import { SkipForwardIcon } from './SkipForwardIcon';
import { SlackIcon } from './SlackIcon';
import { SlashIcon } from './SlashIcon';
import { SlidersIcon } from './SlidersIcon';
import { SmartphoneIcon } from './SmartphoneIcon';
import { SmileIcon } from './SmileIcon';
import { SpeakerIcon } from './SpeakerIcon';
import { SquareIcon } from './SquareIcon';
import { StarIcon } from './StarIcon';
import { StopCircleIcon } from './StopCircleIcon';
import { SunIcon } from './SunIcon';
import { SunriseIcon } from './SunriseIcon';
import { SunsetIcon } from './SunsetIcon';
import { TableIcon } from './TableIcon';
import { TabletIcon } from './TabletIcon';
import { TagIcon } from './TagIcon';
import { TargetIcon } from './TargetIcon';
import { TerminalIcon } from './TerminalIcon';
import { ThermometerIcon } from './ThermometerIcon';
import { ThumbsDownIcon } from './ThumbsDownIcon';
import { ThumbsUpIcon } from './ThumbsUpIcon';
import { ToggleLeftIcon } from './ToggleLeftIcon';
import { ToggleRightIcon } from './ToggleRightIcon';
import { ToolIcon } from './ToolIcon';
import { Trash2Icon } from './Trash2Icon';
import { TrashIcon } from './TrashIcon';
import { TrelloIcon } from './TrelloIcon';
import { TrendingDownIcon } from './TrendingDownIcon';
import { TrendingUpIcon } from './TrendingUpIcon';
import { TriangleIcon } from './TriangleIcon';
import { TruckIcon } from './TruckIcon';
import { TvIcon } from './TvIcon';
import { TwitchIcon } from './TwitchIcon';
import { TwitterIcon } from './TwitterIcon';
import { TypeIcon } from './TypeIcon';
import { UmbrellaIcon } from './UmbrellaIcon';
import { UnderlineIcon } from './UnderlineIcon';
import { UnlockIcon } from './UnlockIcon';
import { UploadCloudIcon } from './UploadCloudIcon';
import { UploadIcon } from './UploadIcon';
import { UserCheckIcon } from './UserCheckIcon';
import { UserMinusIcon } from './UserMinusIcon';
import { UserPlusIcon } from './UserPlusIcon';
import { UserXIcon } from './UserXIcon';
import { UserIcon } from './UserIcon';
import { UsersIcon } from './UsersIcon';
import { VideoOffIcon } from './VideoOffIcon';
import { VideoIcon } from './VideoIcon';
import { VoicemailIcon } from './VoicemailIcon';
import { Volume1Icon } from './Volume1Icon';
import { Volume2Icon } from './Volume2Icon';
import { VolumeXIcon } from './VolumeXIcon';
import { VolumeIcon } from './VolumeIcon';
import { WatchIcon } from './WatchIcon';
import { WifiOffIcon } from './WifiOffIcon';
import { WifiIcon } from './WifiIcon';
import { WindIcon } from './WindIcon';
import { XCircleIcon } from './XCircleIcon';
import { XOctagonIcon } from './XOctagonIcon';
import { XSquareIcon } from './XSquareIcon';
import { XIcon } from './XIcon';
import { YoutubeIcon } from './YoutubeIcon';
import { ZapOffIcon } from './ZapOffIcon';
import { ZapIcon } from './ZapIcon';
import { ZoomInIcon } from './ZoomInIcon';
import { ZoomOutIcon } from './ZoomOutIcon';

export type FeatherIconCatalogEntry = {
  name: string;
  figmaName: string;
  slug: string;
  defaultSize: IconSize;
  nativeSizes: readonly IconSize[];
  Icon: ComponentType<IconProps>;
};

export const FEATHER_ICON_CATALOG_ENTRIES: FeatherIconCatalogEntry[] = [
  { name: 'ActivityIcon', figmaName: 'Activity', slug: 'activity', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ActivityIcon },
  { name: 'AirplayIcon', figmaName: 'Airplay', slug: 'airplay', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AirplayIcon },
  { name: 'AlertCircleIcon', figmaName: 'Alert circle', slug: 'alert-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlertCircleIcon },
  { name: 'AlertOctagonIcon', figmaName: 'Alert octagon', slug: 'alert-octagon', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlertOctagonIcon },
  { name: 'AlertTriangleIcon', figmaName: 'Alert triangle', slug: 'alert-triangle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlertTriangleIcon },
  { name: 'AlignCenterIcon', figmaName: 'Align center', slug: 'align-center', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlignCenterIcon },
  { name: 'AlignJustifyIcon', figmaName: 'Align justify', slug: 'align-justify', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlignJustifyIcon },
  { name: 'AlignLeftIcon', figmaName: 'Align left', slug: 'align-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlignLeftIcon },
  { name: 'AlignRightIcon', figmaName: 'Align right', slug: 'align-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AlignRightIcon },
  { name: 'AnchorIcon', figmaName: 'Anchor', slug: 'anchor', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AnchorIcon },
  { name: 'ApertureIcon', figmaName: 'Aperture', slug: 'aperture', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ApertureIcon },
  { name: 'ArchiveIcon', figmaName: 'Archive', slug: 'archive', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArchiveIcon },
  { name: 'ArrowDownCircleIcon', figmaName: 'Arrow down circle', slug: 'arrow-down-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowDownCircleIcon },
  { name: 'ArrowDownLeftIcon', figmaName: 'Arrow down-left', slug: 'arrow-down-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowDownLeftIcon },
  { name: 'ArrowDownRightIcon', figmaName: 'Arrow down-right', slug: 'arrow-down-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowDownRightIcon },
  { name: 'ArrowDownIcon', figmaName: 'Arrow down', slug: 'arrow-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowDownIcon },
  { name: 'ArrowLeftCircleIcon', figmaName: 'Arrow left-circle', slug: 'arrow-left-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowLeftCircleIcon },
  { name: 'ArrowLeftIcon', figmaName: 'Arrow left', slug: 'arrow-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowLeftIcon },
  { name: 'ArrowRightCircleIcon', figmaName: 'Arrow right-circle', slug: 'arrow-right-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowRightCircleIcon },
  { name: 'ArrowRightIcon', figmaName: 'Arrow right', slug: 'arrow-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowRightIcon },
  { name: 'ArrowUpCircleIcon', figmaName: 'Arrow up-circle', slug: 'arrow-up-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowUpCircleIcon },
  { name: 'ArrowUpLeftIcon', figmaName: 'Arrow up-left', slug: 'arrow-up-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowUpLeftIcon },
  { name: 'ArrowUpRightIcon', figmaName: 'Arrow up-right', slug: 'arrow-up-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowUpRightIcon },
  { name: 'ArrowUpIcon', figmaName: 'Arrow up', slug: 'arrow-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ArrowUpIcon },
  { name: 'AtSignIcon', figmaName: 'At sign', slug: 'at-sign', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AtSignIcon },
  { name: 'AwardIcon', figmaName: 'Award', slug: 'award', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: AwardIcon },
  { name: 'BarChart2Icon', figmaName: 'Bar chart-2', slug: 'bar-chart-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BarChart2Icon },
  { name: 'BarChartIcon', figmaName: 'Bar chart', slug: 'bar-chart', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BarChartIcon },
  { name: 'BatteryChargingIcon', figmaName: 'Battery charging', slug: 'battery-charging', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BatteryChargingIcon },
  { name: 'BatteryIcon', figmaName: 'Battery', slug: 'battery', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BatteryIcon },
  { name: 'BellOffIcon', figmaName: 'Bell off', slug: 'bell-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BellOffIcon },
  { name: 'BellIcon', figmaName: 'Bell', slug: 'bell', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BellIcon },
  { name: 'BluetoothIcon', figmaName: 'Bluetooth', slug: 'bluetooth', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BluetoothIcon },
  { name: 'BoldIcon', figmaName: 'Bold', slug: 'bold', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BoldIcon },
  { name: 'BookOpenIcon', figmaName: 'Book open', slug: 'book-open', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BookOpenIcon },
  { name: 'BookIcon', figmaName: 'Book', slug: 'book', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BookIcon },
  { name: 'BookmarkIcon', figmaName: 'Bookmark', slug: 'bookmark', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BookmarkIcon },
  { name: 'BoxIcon', figmaName: 'Box', slug: 'box', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BoxIcon },
  { name: 'BriefcaseIcon', figmaName: 'Briefcase', slug: 'briefcase', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: BriefcaseIcon },
  { name: 'CalendarIcon', figmaName: 'Calendar', slug: 'calendar', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CalendarIcon },
  { name: 'CameraOffIcon', figmaName: 'Camera off', slug: 'camera-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CameraOffIcon },
  { name: 'CameraIcon', figmaName: 'Camera', slug: 'camera', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CameraIcon },
  { name: 'CastIcon', figmaName: 'Cast', slug: 'cast', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CastIcon },
  { name: 'CheckCircleIcon', figmaName: 'Check circle', slug: 'check-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CheckCircleIcon },
  { name: 'CheckSquareIcon', figmaName: 'Check square', slug: 'check-square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CheckSquareIcon },
  { name: 'CheckIcon', figmaName: 'Check', slug: 'check', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CheckIcon },
  { name: 'ChevronDownIcon', figmaName: 'Chevron down', slug: 'chevron-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronDownIcon },
  { name: 'ChevronLeftIcon', figmaName: 'Chevron left', slug: 'chevron-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronLeftIcon },
  { name: 'ChevronRightIcon', figmaName: 'Chevron right', slug: 'chevron-right', defaultSize: 16 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronRightIcon },
  { name: 'ChevronUpIcon', figmaName: 'Chevron up', slug: 'chevron-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronUpIcon },
  { name: 'ChevronsDownIcon', figmaName: 'Chevrons down', slug: 'chevrons-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronsDownIcon },
  { name: 'ChevronsLeftIcon', figmaName: 'Chevrons left', slug: 'chevrons-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronsLeftIcon },
  { name: 'ChevronsRightIcon', figmaName: 'Chevrons right', slug: 'chevrons-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronsRightIcon },
  { name: 'ChevronsUpIcon', figmaName: 'Chevrons up', slug: 'chevrons-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChevronsUpIcon },
  { name: 'ChromeIcon', figmaName: 'Chrome', slug: 'chrome', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ChromeIcon },
  { name: 'CircleIcon', figmaName: 'Circle', slug: 'circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CircleIcon },
  { name: 'ClipboardIcon', figmaName: 'Clipboard', slug: 'clipboard', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ClipboardIcon },
  { name: 'ClockIcon', figmaName: 'Clock', slug: 'clock', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ClockIcon },
  { name: 'CloudDrizzleIcon', figmaName: 'Cloud drizzle', slug: 'cloud-drizzle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CloudDrizzleIcon },
  { name: 'CloudLightningIcon', figmaName: 'Cloud lightning', slug: 'cloud-lightning', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CloudLightningIcon },
  { name: 'CloudOffIcon', figmaName: 'Cloud off', slug: 'cloud-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CloudOffIcon },
  { name: 'CloudRainIcon', figmaName: 'Cloud rain', slug: 'cloud-rain', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CloudRainIcon },
  { name: 'CloudSnowIcon', figmaName: 'Cloud snow', slug: 'cloud-snow', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CloudSnowIcon },
  { name: 'CloudIcon', figmaName: 'Cloud', slug: 'cloud', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CloudIcon },
  { name: 'CodeIcon', figmaName: 'Code', slug: 'code', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CodeIcon },
  { name: 'CodepenIcon', figmaName: 'Codepen', slug: 'codepen', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CodepenIcon },
  { name: 'CodesandboxIcon', figmaName: 'Codesandbox', slug: 'codesandbox', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CodesandboxIcon },
  { name: 'CoffeeIcon', figmaName: 'Coffee', slug: 'coffee', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CoffeeIcon },
  { name: 'ColumnsIcon', figmaName: 'Columns', slug: 'columns', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ColumnsIcon },
  { name: 'CommandIcon', figmaName: 'Command', slug: 'command', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CommandIcon },
  { name: 'CompassIcon', figmaName: 'Compass', slug: 'compass', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CompassIcon },
  { name: 'CopyIcon', figmaName: 'Copy', slug: 'copy', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CopyIcon },
  { name: 'CornerDownLeftIcon', figmaName: 'Corner down-left', slug: 'corner-down-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerDownLeftIcon },
  { name: 'CornerDownRightIcon', figmaName: 'Corner down-right', slug: 'corner-down-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerDownRightIcon },
  { name: 'CornerLeftDownIcon', figmaName: 'Corner left-down', slug: 'corner-left-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerLeftDownIcon },
  { name: 'CornerLeftUpIcon', figmaName: 'Corner left-up', slug: 'corner-left-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerLeftUpIcon },
  { name: 'CornerRightDownIcon', figmaName: 'Corner right-down', slug: 'corner-right-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerRightDownIcon },
  { name: 'CornerRightUpIcon', figmaName: 'Corner right-up', slug: 'corner-right-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerRightUpIcon },
  { name: 'CornerUpLeftIcon', figmaName: 'Corner up-left', slug: 'corner-up-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerUpLeftIcon },
  { name: 'CornerUpRightIcon', figmaName: 'Corner up-right', slug: 'corner-up-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CornerUpRightIcon },
  { name: 'CpuIcon', figmaName: 'Cpu', slug: 'cpu', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CpuIcon },
  { name: 'CreditCardIcon', figmaName: 'Credit card', slug: 'credit-card', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CreditCardIcon },
  { name: 'CropIcon', figmaName: 'Crop', slug: 'crop', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CropIcon },
  { name: 'CrosshairIcon', figmaName: 'Crosshair', slug: 'crosshair', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: CrosshairIcon },
  { name: 'DatabaseIcon', figmaName: 'Database', slug: 'database', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DatabaseIcon },
  { name: 'DeleteIcon', figmaName: 'Delete', slug: 'delete', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DeleteIcon },
  { name: 'DiscIcon', figmaName: 'Disc', slug: 'disc', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DiscIcon },
  { name: 'DivideCircleIcon', figmaName: 'Divide circle', slug: 'divide-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DivideCircleIcon },
  { name: 'DivideSquareIcon', figmaName: 'Divide square', slug: 'divide-square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DivideSquareIcon },
  { name: 'DivideIcon', figmaName: 'Divide', slug: 'divide', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DivideIcon },
  { name: 'DollarSignIcon', figmaName: 'Dollar sign', slug: 'dollar-sign', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DollarSignIcon },
  { name: 'DownloadCloudIcon', figmaName: 'Download cloud', slug: 'download-cloud', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DownloadCloudIcon },
  { name: 'DownloadIcon', figmaName: 'Download', slug: 'download', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DownloadIcon },
  { name: 'DribbbleIcon', figmaName: 'Dribbble', slug: 'dribbble', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DribbbleIcon },
  { name: 'DropletIcon', figmaName: 'Droplet', slug: 'droplet', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: DropletIcon },
  { name: 'Edit2Icon', figmaName: 'Edit 2', slug: 'edit-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Edit2Icon },
  { name: 'Edit3Icon', figmaName: 'Edit 3', slug: 'edit-3', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Edit3Icon },
  { name: 'EditIcon', figmaName: 'Edit', slug: 'edit', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: EditIcon },
  { name: 'ExternalLinkIcon', figmaName: 'External link', slug: 'external-link', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ExternalLinkIcon },
  { name: 'EyeOffIcon', figmaName: 'Eye off', slug: 'eye-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: EyeOffIcon },
  { name: 'EyeIcon', figmaName: 'Eye', slug: 'eye', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: EyeIcon },
  { name: 'FacebookIcon', figmaName: 'Facebook', slug: 'facebook', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FacebookIcon },
  { name: 'FastForwardIcon', figmaName: 'Fast forward', slug: 'fast-forward', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FastForwardIcon },
  { name: 'FeatherIcon', figmaName: 'Feather', slug: 'feather', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FeatherIcon },
  { name: 'FigmaIcon', figmaName: 'Figma', slug: 'figma', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FigmaIcon },
  { name: 'FileMinusIcon', figmaName: 'File minus', slug: 'file-minus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FileMinusIcon },
  { name: 'FilePlusIcon', figmaName: 'File plus', slug: 'file-plus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FilePlusIcon },
  { name: 'FileTextIcon', figmaName: 'File text', slug: 'file-text', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FileTextIcon },
  { name: 'FileIcon', figmaName: 'File', slug: 'file', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FileIcon },
  { name: 'FilmIcon', figmaName: 'Film', slug: 'film', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FilmIcon },
  { name: 'FilterIcon', figmaName: 'Filter', slug: 'filter', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FilterIcon },
  { name: 'FlagIcon', figmaName: 'Flag', slug: 'flag', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FlagIcon },
  { name: 'FolderMinusIcon', figmaName: 'Folder minus', slug: 'folder-minus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FolderMinusIcon },
  { name: 'FolderPlusIcon', figmaName: 'Folder plus', slug: 'folder-plus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FolderPlusIcon },
  { name: 'FolderIcon', figmaName: 'Folder', slug: 'folder', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FolderIcon },
  { name: 'FramerIcon', figmaName: 'Framer', slug: 'framer', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FramerIcon },
  { name: 'FrownIcon', figmaName: 'Frown', slug: 'frown', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: FrownIcon },
  { name: 'GiftIcon', figmaName: 'Gift', slug: 'gift', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GiftIcon },
  { name: 'GitBranchIcon', figmaName: 'Git branch', slug: 'git-branch', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GitBranchIcon },
  { name: 'GitCommitIcon', figmaName: 'Git commit', slug: 'git-commit', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GitCommitIcon },
  { name: 'GitMergeIcon', figmaName: 'Git merge', slug: 'git-merge', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GitMergeIcon },
  { name: 'GitPullRequestIcon', figmaName: 'Git pull-request', slug: 'git-pull-request', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GitPullRequestIcon },
  { name: 'GithubIcon', figmaName: 'Github', slug: 'github', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GithubIcon },
  { name: 'GitlabIcon', figmaName: 'Gitlab', slug: 'gitlab', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GitlabIcon },
  { name: 'GlobeIcon', figmaName: 'Globe', slug: 'globe', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GlobeIcon },
  { name: 'GridIcon', figmaName: 'Grid', slug: 'grid', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: GridIcon },
  { name: 'HardDriveIcon', figmaName: 'Hard drive', slug: 'hard-drive', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HardDriveIcon },
  { name: 'HashIcon', figmaName: 'Hash', slug: 'hash', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HashIcon },
  { name: 'HeadphonesIcon', figmaName: 'Headphones', slug: 'headphones', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HeadphonesIcon },
  { name: 'HeartIcon', figmaName: 'Heart', slug: 'heart', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HeartIcon },
  { name: 'HelpCircleIcon', figmaName: 'Help circle', slug: 'help-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HelpCircleIcon },
  { name: 'HexagonIcon', figmaName: 'Hexagon', slug: 'hexagon', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HexagonIcon },
  { name: 'HomeIcon', figmaName: 'Home', slug: 'home', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: HomeIcon },
  { name: 'ImageIcon', figmaName: 'Image', slug: 'image', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ImageIcon },
  { name: 'InboxIcon', figmaName: 'Inbox', slug: 'inbox', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: InboxIcon },
  { name: 'InfoIcon', figmaName: 'Info', slug: 'info', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: InfoIcon },
  { name: 'InstagramIcon', figmaName: 'Instagram', slug: 'instagram', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: InstagramIcon },
  { name: 'ItalicIcon', figmaName: 'Italic', slug: 'italic', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ItalicIcon },
  { name: 'KeyIcon', figmaName: 'Key', slug: 'key', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: KeyIcon },
  { name: 'LayersIcon', figmaName: 'Layers', slug: 'layers', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LayersIcon },
  { name: 'LayoutIcon', figmaName: 'Layout', slug: 'layout', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LayoutIcon },
  { name: 'LifeBuoyIcon', figmaName: 'Life buoy', slug: 'life-buoy', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LifeBuoyIcon },
  { name: 'Link2Icon', figmaName: 'Link 2', slug: 'link-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Link2Icon },
  { name: 'LinkIcon', figmaName: 'Link', slug: 'link', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LinkIcon },
  { name: 'LinkedinIcon', figmaName: 'Linkedin', slug: 'linkedin', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LinkedinIcon },
  { name: 'ListIcon', figmaName: 'List', slug: 'list', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ListIcon },
  { name: 'LoaderIcon', figmaName: 'Loader', slug: 'loader', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LoaderIcon },
  { name: 'LockIcon', figmaName: 'Lock', slug: 'lock', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LockIcon },
  { name: 'LogInIcon', figmaName: 'Log in', slug: 'log-in', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LogInIcon },
  { name: 'LogOutIcon', figmaName: 'Log out', slug: 'log-out', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: LogOutIcon },
  { name: 'MailIcon', figmaName: 'Mail', slug: 'mail', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MailIcon },
  { name: 'MapPinIcon', figmaName: 'Map pin', slug: 'map-pin', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MapPinIcon },
  { name: 'MapIcon', figmaName: 'Map', slug: 'map', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MapIcon },
  { name: 'Maximize2Icon', figmaName: 'Maximize 2', slug: 'maximize-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Maximize2Icon },
  { name: 'MaximizeIcon', figmaName: 'Maximize', slug: 'maximize', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MaximizeIcon },
  { name: 'MehIcon', figmaName: 'Meh', slug: 'meh', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MehIcon },
  { name: 'MenuIcon', figmaName: 'Menu', slug: 'menu', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MenuIcon },
  { name: 'MessageCircleIcon', figmaName: 'Message circle', slug: 'message-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MessageCircleIcon },
  { name: 'MessageSquareIcon', figmaName: 'Message square', slug: 'message-square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MessageSquareIcon },
  { name: 'MicOffIcon', figmaName: 'Mic off', slug: 'mic-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MicOffIcon },
  { name: 'MicIcon', figmaName: 'Mic', slug: 'mic', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MicIcon },
  { name: 'Minimize2Icon', figmaName: 'Minimize 2', slug: 'minimize-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Minimize2Icon },
  { name: 'MinimizeIcon', figmaName: 'Minimize', slug: 'minimize', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MinimizeIcon },
  { name: 'MinusCircleIcon', figmaName: 'Minus circle', slug: 'minus-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MinusCircleIcon },
  { name: 'MinusSquareIcon', figmaName: 'Minus square', slug: 'minus-square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MinusSquareIcon },
  { name: 'MinusIcon', figmaName: 'Minus', slug: 'minus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MinusIcon },
  { name: 'MonitorIcon', figmaName: 'Monitor', slug: 'monitor', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MonitorIcon },
  { name: 'MoonIcon', figmaName: 'Moon', slug: 'moon', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MoonIcon },
  { name: 'MoreHorizontalIcon', figmaName: 'More horizontal', slug: 'more-horizontal', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MoreHorizontalIcon },
  { name: 'MoreVerticalIcon', figmaName: 'More vertical', slug: 'more-vertical', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MoreVerticalIcon },
  { name: 'MousePointerIcon', figmaName: 'Mouse pointer', slug: 'mouse-pointer', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MousePointerIcon },
  { name: 'MoveIcon', figmaName: 'Move', slug: 'move', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MoveIcon },
  { name: 'MusicIcon', figmaName: 'Music', slug: 'music', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: MusicIcon },
  { name: 'Navigation2Icon', figmaName: 'Navigation 2', slug: 'navigation-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Navigation2Icon },
  { name: 'NavigationIcon', figmaName: 'Navigation', slug: 'navigation', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: NavigationIcon },
  { name: 'OctagonIcon', figmaName: 'Octagon', slug: 'octagon', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: OctagonIcon },
  { name: 'PackageIcon', figmaName: 'Package', slug: 'package', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PackageIcon },
  { name: 'PaperclipIcon', figmaName: 'Paperclip', slug: 'paperclip', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PaperclipIcon },
  { name: 'PauseCircleIcon', figmaName: 'Pause circle', slug: 'pause-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PauseCircleIcon },
  { name: 'PauseIcon', figmaName: 'Pause', slug: 'pause', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PauseIcon },
  { name: 'PenToolIcon', figmaName: 'Pen tool', slug: 'pen-tool', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PenToolIcon },
  { name: 'PercentIcon', figmaName: 'Percent', slug: 'percent', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PercentIcon },
  { name: 'PhoneCallIcon', figmaName: 'Phone call', slug: 'phone-call', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneCallIcon },
  { name: 'PhoneForwardedIcon', figmaName: 'Phone forwarded', slug: 'phone-forwarded', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneForwardedIcon },
  { name: 'PhoneIncomingIcon', figmaName: 'Phone incoming', slug: 'phone-incoming', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneIncomingIcon },
  { name: 'PhoneMissedIcon', figmaName: 'Phone missed', slug: 'phone-missed', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneMissedIcon },
  { name: 'PhoneOffIcon', figmaName: 'Phone off', slug: 'phone-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneOffIcon },
  { name: 'PhoneOutgoingIcon', figmaName: 'Phone outgoing', slug: 'phone-outgoing', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneOutgoingIcon },
  { name: 'PhoneIcon', figmaName: 'Phone', slug: 'phone', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PhoneIcon },
  { name: 'PieChartIcon', figmaName: 'Pie chart', slug: 'pie-chart', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PieChartIcon },
  { name: 'PlayCircleIcon', figmaName: 'Play circle', slug: 'play-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PlayCircleIcon },
  { name: 'PlayIcon', figmaName: 'Play', slug: 'play', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PlayIcon },
  { name: 'PlusCircleIcon', figmaName: 'Plus circle', slug: 'plus-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PlusCircleIcon },
  { name: 'PlusSquareIcon', figmaName: 'Plus square', slug: 'plus-square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PlusSquareIcon },
  { name: 'PlusIcon', figmaName: 'Plus', slug: 'plus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PlusIcon },
  { name: 'PocketIcon', figmaName: 'Pocket', slug: 'pocket', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PocketIcon },
  { name: 'PowerIcon', figmaName: 'Power', slug: 'power', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PowerIcon },
  { name: 'PrinterIcon', figmaName: 'Printer', slug: 'printer', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: PrinterIcon },
  { name: 'RadioIcon', figmaName: 'Radio', slug: 'radio', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RadioIcon },
  { name: 'RefreshCcwIcon', figmaName: 'Refresh ccw', slug: 'refresh-ccw', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RefreshCcwIcon },
  { name: 'RefreshCwIcon', figmaName: 'Refresh cw', slug: 'refresh-cw', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RefreshCwIcon },
  { name: 'RepeatIcon', figmaName: 'Repeat', slug: 'repeat', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RepeatIcon },
  { name: 'RewindIcon', figmaName: 'Rewind', slug: 'rewind', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RewindIcon },
  { name: 'RotateCcwIcon', figmaName: 'Rotate ccw', slug: 'rotate-ccw', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RotateCcwIcon },
  { name: 'RotateCwIcon', figmaName: 'Rotate cw', slug: 'rotate-cw', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RotateCwIcon },
  { name: 'RssIcon', figmaName: 'Rss', slug: 'rss', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: RssIcon },
  { name: 'SaveIcon', figmaName: 'Save', slug: 'save', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SaveIcon },
  { name: 'ScissorsIcon', figmaName: 'Scissors', slug: 'scissors', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ScissorsIcon },
  { name: 'SearchIcon', figmaName: 'Search', slug: 'search', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SearchIcon },
  { name: 'SendIcon', figmaName: 'Send', slug: 'send', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SendIcon },
  { name: 'ServerIcon', figmaName: 'Server', slug: 'server', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ServerIcon },
  { name: 'SettingsIcon', figmaName: 'Settings', slug: 'settings', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SettingsIcon },
  { name: 'Share2Icon', figmaName: 'Share 2', slug: 'share-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Share2Icon },
  { name: 'ShareIcon', figmaName: 'Share', slug: 'share', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ShareIcon },
  { name: 'ShieldOffIcon', figmaName: 'Shield off', slug: 'shield-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ShieldOffIcon },
  { name: 'ShieldIcon', figmaName: 'Shield', slug: 'shield', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ShieldIcon },
  { name: 'ShoppingBagIcon', figmaName: 'Shopping bag', slug: 'shopping-bag', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ShoppingBagIcon },
  { name: 'ShoppingCartIcon', figmaName: 'Shopping cart', slug: 'shopping-cart', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ShoppingCartIcon },
  { name: 'ShuffleIcon', figmaName: 'Shuffle', slug: 'shuffle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ShuffleIcon },
  { name: 'SidebarIcon', figmaName: 'Sidebar', slug: 'sidebar', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SidebarIcon },
  { name: 'SkipBackIcon', figmaName: 'Skip back', slug: 'skip-back', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SkipBackIcon },
  { name: 'SkipForwardIcon', figmaName: 'Skip forward', slug: 'skip-forward', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SkipForwardIcon },
  { name: 'SlackIcon', figmaName: 'Slack', slug: 'slack', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SlackIcon },
  { name: 'SlashIcon', figmaName: 'Slash', slug: 'slash', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SlashIcon },
  { name: 'SlidersIcon', figmaName: 'Sliders', slug: 'sliders', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SlidersIcon },
  { name: 'SmartphoneIcon', figmaName: 'Smartphone', slug: 'smartphone', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SmartphoneIcon },
  { name: 'SmileIcon', figmaName: 'Smile', slug: 'smile', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SmileIcon },
  { name: 'SpeakerIcon', figmaName: 'Speaker', slug: 'speaker', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SpeakerIcon },
  { name: 'SquareIcon', figmaName: 'Square', slug: 'square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SquareIcon },
  { name: 'StarIcon', figmaName: 'Star', slug: 'star', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: StarIcon },
  { name: 'StopCircleIcon', figmaName: 'Stop circle', slug: 'stop-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: StopCircleIcon },
  { name: 'SunIcon', figmaName: 'Sun', slug: 'sun', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SunIcon },
  { name: 'SunriseIcon', figmaName: 'Sunrise', slug: 'sunrise', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SunriseIcon },
  { name: 'SunsetIcon', figmaName: 'Sunset', slug: 'sunset', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: SunsetIcon },
  { name: 'TableIcon', figmaName: 'Table', slug: 'table', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TableIcon },
  { name: 'TabletIcon', figmaName: 'Tablet', slug: 'tablet', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TabletIcon },
  { name: 'TagIcon', figmaName: 'Tag', slug: 'tag', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TagIcon },
  { name: 'TargetIcon', figmaName: 'Target', slug: 'target', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TargetIcon },
  { name: 'TerminalIcon', figmaName: 'Terminal', slug: 'terminal', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TerminalIcon },
  { name: 'ThermometerIcon', figmaName: 'Thermometer', slug: 'thermometer', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ThermometerIcon },
  { name: 'ThumbsDownIcon', figmaName: 'Thumbs down', slug: 'thumbs-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ThumbsDownIcon },
  { name: 'ThumbsUpIcon', figmaName: 'Thumbs up', slug: 'thumbs-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ThumbsUpIcon },
  { name: 'ToggleLeftIcon', figmaName: 'Toggle left', slug: 'toggle-left', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ToggleLeftIcon },
  { name: 'ToggleRightIcon', figmaName: 'Toggle right', slug: 'toggle-right', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ToggleRightIcon },
  { name: 'ToolIcon', figmaName: 'Tool', slug: 'tool', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ToolIcon },
  { name: 'Trash2Icon', figmaName: 'Trash 2', slug: 'trash-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Trash2Icon },
  { name: 'TrashIcon', figmaName: 'Trash', slug: 'trash', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TrashIcon },
  { name: 'TrelloIcon', figmaName: 'Trello', slug: 'trello', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TrelloIcon },
  { name: 'TrendingDownIcon', figmaName: 'Trending down', slug: 'trending-down', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TrendingDownIcon },
  { name: 'TrendingUpIcon', figmaName: 'Trending up', slug: 'trending-up', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TrendingUpIcon },
  { name: 'TriangleIcon', figmaName: 'Triangle', slug: 'triangle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TriangleIcon },
  { name: 'TruckIcon', figmaName: 'Truck', slug: 'truck', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TruckIcon },
  { name: 'TvIcon', figmaName: 'Tv', slug: 'tv', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TvIcon },
  { name: 'TwitchIcon', figmaName: 'Twitch', slug: 'twitch', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TwitchIcon },
  { name: 'TwitterIcon', figmaName: 'Twitter', slug: 'twitter', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TwitterIcon },
  { name: 'TypeIcon', figmaName: 'Type', slug: 'type', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: TypeIcon },
  { name: 'UmbrellaIcon', figmaName: 'Umbrella', slug: 'umbrella', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UmbrellaIcon },
  { name: 'UnderlineIcon', figmaName: 'Underline', slug: 'underline', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UnderlineIcon },
  { name: 'UnlockIcon', figmaName: 'Unlock', slug: 'unlock', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UnlockIcon },
  { name: 'UploadCloudIcon', figmaName: 'Upload cloud', slug: 'upload-cloud', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UploadCloudIcon },
  { name: 'UploadIcon', figmaName: 'Upload', slug: 'upload', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UploadIcon },
  { name: 'UserCheckIcon', figmaName: 'User check', slug: 'user-check', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UserCheckIcon },
  { name: 'UserMinusIcon', figmaName: 'User minus', slug: 'user-minus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UserMinusIcon },
  { name: 'UserPlusIcon', figmaName: 'User plus', slug: 'user-plus', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UserPlusIcon },
  { name: 'UserXIcon', figmaName: 'User x', slug: 'user-x', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UserXIcon },
  { name: 'UserIcon', figmaName: 'User', slug: 'user', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UserIcon },
  { name: 'UsersIcon', figmaName: 'Users', slug: 'users', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: UsersIcon },
  { name: 'VideoOffIcon', figmaName: 'Video off', slug: 'video-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: VideoOffIcon },
  { name: 'VideoIcon', figmaName: 'Video', slug: 'video', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: VideoIcon },
  { name: 'VoicemailIcon', figmaName: 'Voicemail', slug: 'voicemail', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: VoicemailIcon },
  { name: 'Volume1Icon', figmaName: 'Volume 1', slug: 'volume-1', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Volume1Icon },
  { name: 'Volume2Icon', figmaName: 'Volume 2', slug: 'volume-2', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: Volume2Icon },
  { name: 'VolumeXIcon', figmaName: 'Volume x', slug: 'volume-x', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: VolumeXIcon },
  { name: 'VolumeIcon', figmaName: 'Volume', slug: 'volume', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: VolumeIcon },
  { name: 'WatchIcon', figmaName: 'Watch', slug: 'watch', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: WatchIcon },
  { name: 'WifiOffIcon', figmaName: 'Wifi off', slug: 'wifi-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: WifiOffIcon },
  { name: 'WifiIcon', figmaName: 'Wifi', slug: 'wifi', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: WifiIcon },
  { name: 'WindIcon', figmaName: 'Wind', slug: 'wind', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: WindIcon },
  { name: 'XCircleIcon', figmaName: 'X circle', slug: 'x-circle', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: XCircleIcon },
  { name: 'XOctagonIcon', figmaName: 'X octagon', slug: 'x-octagon', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: XOctagonIcon },
  { name: 'XSquareIcon', figmaName: 'X square', slug: 'x-square', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: XSquareIcon },
  { name: 'XIcon', figmaName: 'X', slug: 'x', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: XIcon },
  { name: 'YoutubeIcon', figmaName: 'Youtube', slug: 'youtube', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: YoutubeIcon },
  { name: 'ZapOffIcon', figmaName: 'Zap off', slug: 'zap-off', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ZapOffIcon },
  { name: 'ZapIcon', figmaName: 'Zap', slug: 'zap', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ZapIcon },
  { name: 'ZoomInIcon', figmaName: 'Zoom in', slug: 'zoom-in', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ZoomInIcon },
  { name: 'ZoomOutIcon', figmaName: 'Zoom out', slug: 'zoom-out', defaultSize: 20 as const, nativeSizes: [16, 20, 24, 32, 40, 48] as const, Icon: ZoomOutIcon },
];
