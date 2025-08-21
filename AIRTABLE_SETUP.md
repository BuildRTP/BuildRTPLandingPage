# Airtable Setup Guide

The check-in system has been migrated to use Airtable as the backend database. Follow these steps to set up your Airtable base.

## 1. Create Airtable Base

Create a new Airtable base with the following tables:

### Table 1: "Check-ins"
| Field Name | Field Type | Options |
|------------|------------|---------|
| `id` | Primary field (auto-generated) | |
| `type` | Single select | Options: visitor, team, event |
| `timestamp` | Date and time | Include time |
| `checkOutTime` | Date and time | Include time (optional) |
| `firstName` | Single line text | |
| `lastName` | Single line text | |
| `memberId` | Single line text | For team check-ins |
| `eventId` | Single line text | For event check-ins |
| `company` | Single line text | Optional |
| `purpose` | Long text | Optional |
| `email` | Email | Optional |
| `phone` | Phone number | Optional |
| `customFields` | Long text | JSON format for event custom fields |

### Table 2: "Team-members"
| Field Name | Field Type | Options |
|------------|------------|---------|
| `id` | Primary field (auto-generated) | |
| `name` | Single line text | |
| `active` | Checkbox | Default: checked |

### Table 3: "Events"
| Field Name | Field Type | Options |
|------------|------------|---------|
| `id` | Primary field (auto-generated) | |
| `name` | Single line text | |
| `date` | Date | |
| `customFields` | Long text | JSON format |

### Table 4: "Settings"
| Field Name | Field Type | Options |
|------------|------------|---------|
| `key` | Primary field (Single line text) | |
| `value` | Single line text | |

## 2. Get API Credentials

1. Go to [Airtable Account](https://airtable.com/account)
2. Generate a personal access token with full access to your base
3. Copy your Base ID from the Airtable API documentation page

## 3. Environment Variables

Update your `.env.local` file with:

```env
# Airtable Configuration
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_API_KEY=your_api_key_here

# Admin Configuration (optional - will use these as defaults)
ADMIN_PASSWORD=buildrtp2024
TEAM_PASSWORD=buildrtp2024
```

## 4. Pre-populate Data

### Team Members
Add your initial team members to the "Team-members" table:
- Set `active` to checked for active members
- Add member names

### Settings (Optional)
You can pre-set passwords in the "Settings" table:
- Key: `admin_password`, Value: `your_admin_password`
- Key: `team_password`, Value: `your_team_password`

## 5. Features

### Automatic Fallbacks
- If Airtable is unavailable, the system will show appropriate error messages
- Team members list falls back to hardcoded defaults if Airtable fails
- Passwords fall back to environment variables if not set in Airtable

### Data Sync
- All check-ins are stored in real-time to Airtable
- Admin dashboard pulls live data from Airtable
- Check-out operations update existing records

### Admin Functions
- View all check-ins with filtering
- See currently active check-ins
- Manual check-out capability
- Data export (pulls from Airtable)

## 6. Security Notes

- API key should be kept secure and not committed to version control
- The `NEXT_PUBLIC_AIRTABLE_BASE_ID` is safe to be public (it's the base ID, not sensitive)
- Admin and team passwords can be changed through the Settings table
- All API calls include proper error handling for network issues

## 7. Testing

To test the setup:
1. Ensure environment variables are set
2. Run `npm run dev`
3. Navigate to `/checkin`
4. Try creating a visitor check-in
5. Check your Airtable base to see the new record
6. Test admin dashboard at `/checkin/admin`

The system will gracefully handle network issues and provide user-friendly error messages when Airtable is unavailable.