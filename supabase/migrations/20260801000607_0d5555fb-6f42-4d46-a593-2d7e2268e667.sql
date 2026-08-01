
create policy "anon can upload keepsake photos"
on storage.objects for insert to anon, authenticated
with check (bucket_id = 'keepsake-photos');

create policy "anon can read keepsake photos"
on storage.objects for select to anon, authenticated
using (bucket_id = 'keepsake-photos');
